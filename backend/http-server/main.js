require("dotenv").config({
  path: "./.env",
  encoding: "latin1",
  debug: true,
  override: false,
});

const cors = require("cors");
const express = require("express");
const app = express();

const router = require("./router/router");
app.use(cors());
app.use(express.json());

// app.use((req,res) => console.log(req.body))

app.use(router);

app.listen(process.env.HTTP_SERVER_PORT, () => {
  console.log("http server is runnig!" + " " + process.env.HTTP_SERVER_PORT);
  /*
  Здесь можно попробовать реализовать подключение к базе данных для централизации и обработки ошибок

   */
});
