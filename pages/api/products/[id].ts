import { MulterRequest } from "./../../../middleware/image-upload-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import imageUploadMiddleware from "../../../middleware/image-upload-middleware";

import Product from "../../../models/Product";
import dbConnect from "../../../services/db/dbConnect";
import { baseUrl } from "../../../services/api-service";

dbConnect();

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.error(err);
    res.status(500).json({ error: err.message });
  },
});

apiRoute.get(async (req, res) => {
  const product = await Product.findById(req.query.id);
  res.status(200).json(product);
});

apiRoute.delete(async (req, res) => {
  await Product.findByIdAndDelete(req.query.id);
  res.status(204).end();
});

apiRoute.use(imageUploadMiddleware);

apiRoute.patch(async (req: NextApiRequest & MulterRequest, res) => {
  if (req.file) {
    req.body.image = baseUrl + req.file.path.replace("public/", "");
  }
  const product = await Product.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
  });
  res.status(201).json(product);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
