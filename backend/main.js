require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const router = require('./router/router');
const wsSerever = require('./lib/ws')
app.use(cors());

app.use(express.json());

app.use(router);

app.listen(process.env.HTTP_SERVER_PORT, async () => {
  await wsSerever()
  console.log("http server is runnig!" + " " + process.env.HTTP_SERVER_PORT);
});
