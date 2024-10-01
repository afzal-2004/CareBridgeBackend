import express from "express";
const app = express();
import Db_Conntection from "./Db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const port = 3000;
app.get("/", function (req, res) {
  res.send(" Setup Is Completed ");
});

app.listen(port, () => {
  console.log(`App is Listen On This http://localhost:${port}`);
});
