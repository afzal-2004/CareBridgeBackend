import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import Db_Conntection from "./Db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use(cookieParser());
app.use(express.json({ limit: "16mb" }));
app.use(express.static("public"));
const port = 3000;
app.get("/", function (req, res) {
  res.send(" Setup Is Completed ");
});
import Routes from "./Routes/index.js";

app.use("/care", Routes);
Db_Conntection();
app.listen(port, () => {
  console.log(`App is Listen On This http://localhost:${port}`);
});
