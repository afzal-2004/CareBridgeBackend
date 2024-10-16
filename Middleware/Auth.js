import jwt from "jsonwebtoken";
import { user } from "../src/Models/userModel.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
export const Auth = async (req, res, next) => {
  //   const token = req.cookies.token;
  const Token = req.headers.authorization;
  if (!Token || !Token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization Header is Missing or Malformed" });
  }

  const token = Token.split(" ")[1];
  console.log(" This is  Taken from frountend Side ", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization Header is Missing " });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESSS_TOKRN_SECRECT);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid Or Expoired Sesssion",
    });
  }
};
