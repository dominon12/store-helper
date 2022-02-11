import nc from "next-connect";
import { NextApiResponse, NextApiRequest } from "next";
import { hash } from "bcrypt";

import User from "../../../../models/User";
import dbConnect from "../../../../services/db/dbConnect";

dbConnect();

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.error(err);
    res.status(500).json({ error: err.message });
  },
});

apiRoute.post(async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      error: "Username and password body parameters are required",
    });
  }
  req.body.password = await hash(req.body.password, 12);
  req.body.isAdmin = false;
  const user = await User.create(req.body);
  res.status(201).json(user);
});

export default apiRoute;
