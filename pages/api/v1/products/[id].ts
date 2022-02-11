import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import adminPermissions from "../../../../middleware/admin-permissions";

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

apiRoute.delete(
  adminPermissions(async (req, res) => {
    await Product.findByIdAndDelete(req.query.id);
    res.status(204).end();
  })
);

apiRoute.patch(
  adminPermissions(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });
    res.status(202).json(product);
  })
);

export default apiRoute;
