const express = require("express");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes/routerController");
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(process.env.HTTP_PORT, async () => {
  console.log(
    `http сервер запущен ${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`
  );
});
