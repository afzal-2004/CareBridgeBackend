import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const genratreAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESSS_TOKRN_SECRECT, {
    expiresIn: "1d",
  });
};
export { genratreAccessToken };
