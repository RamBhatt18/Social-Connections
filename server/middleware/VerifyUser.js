import jwt from "jsonwebtoken";
//check the below caps...
import { UserModel } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //we store id inside the payload
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      try {
        if (err) {
          return res.status(401).json({ error: "Unauthorized." });
        }
        const user = await UserModel.findOne({ _id: payload._id }).select(
          //selecting user without password...
          "-password"
        );
        req.user = user;
        //if valid then go next....
        next();
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};
