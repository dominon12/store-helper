import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import Product from "../../../models/Product";
import dbConnect from "../../../services/db/dbConnect";

dbConnect();

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.error(err);
    res.status(500).json({ error: err.message });
  },
});

apiRoute.get(async (req, res) => {
  const { id } = req.query;
  const product = await Product.findById(id);
  res.status(200).json(product);
});

apiRoute.delete(async (req, res) => {
  const { id } = req.query;
  await Product.findByIdAndDelete(id);
  res.status(204).end();
});

export default apiRoute;
