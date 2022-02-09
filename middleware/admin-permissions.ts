import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const adminPermissions =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const claims = verify(
        req.headers.authorization!,
        process.env.JWT_SECRET!
      );

      if (typeof claims === "object") {
        if (Date.now() > claims.exp!) {
          throw new Error(
            "Your session has expired. Please log out and log in again."
          );
        }
        if (!claims.isAdmin) {
          throw new Error("Permission denied.");
        }
      }

      return await fn(req, res);
    } catch (err) {
      res.status(403).json({ error: (err as Error).message });
    }
  };

export default adminPermissions;
