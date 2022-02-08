import { NextApiResponse, NextApiRequest } from "next";
import nc from "next-connect";

import dbConnect from "../../../services/db/dbConnect";
import imageUploadMiddleware, {
  MulterRequest,
} from "../../../middleware/image-upload-middleware";
import Product from "../../../models/Product";

dbConnect();

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.error(err);
    res.status(500).json({ error: err.message });
  },
});

apiRoute.get(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

apiRoute.use(imageUploadMiddleware);

apiRoute.post(async (req: NextApiRequest & MulterRequest, res) => {
  req.body.image = req.file.path.replace("public/", "");
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
