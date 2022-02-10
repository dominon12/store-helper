import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

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
  const user = await User.findOne({ username: req.body.username });

  const passwordHashesAreEqual = await compare(
    req.body.password,
    user.password
  );

  if (passwordHashesAreEqual) {
    const claims = { userId: user._id, isAdmin: user.isAdmin };
    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 1 day
    const jwt = sign(claims, process.env.JWT_SECRET!, { expiresIn });
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      token: jwt,
      expiresIn,
    });
  } else {
    res.status(401).json({
      error: "Authentication failed. Provided credentials are incorrect.",
    });
  }
});

export default apiRoute;
