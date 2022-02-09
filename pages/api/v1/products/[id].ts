import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import Product from "../../../../models/Product";
import dbConnect from "../../../../services/db/dbConnect";

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

apiRoute.patch(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
  });
  res.status(201).json(product);
});

export default apiRoute;
