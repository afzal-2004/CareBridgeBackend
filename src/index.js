import express from "express";
import cors from "cors";
const app = express();
import Db_Conntection from "./Db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
