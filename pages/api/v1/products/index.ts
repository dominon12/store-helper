import { NextApiResponse, NextApiRequest } from "next";
import nc from "next-connect";

import dbConnect from "../../../../services/db/dbConnect";
import Product from "../../../../models/Product";
import adminPermissions from "../../../../middleware/admin-permissions";

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

apiRoute.post(
  adminPermissions(async (req, res) => {
    console.log({ body: req.body });
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

export default apiRoute;
