require("dotenv").config();
 
const cors = require("cors");
const express = require("express");
const app = express();
const router = require('./router/router');

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(process.env.HTTP_SERVER_PORT, async () => {
  console.log("http server is runnig!" + " " + process.env.HTTP_SERVER_PORT);
});
