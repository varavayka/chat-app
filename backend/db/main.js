const { connect } = require("mongoose");
require("dotenv").config({
  path: "./.env",
  encoding: "latin1",
  debug: true,
  override: false,
});

const auth = require("./login/authentication");
const reg = require("./login/registration");

async function main(doc, typeRequest) {
  const CONNECT_DB = await connect(process.env.MONGO_DB_HOST);
  const DB_MODEL = CONNECT_DB.model;

  if (typeRequest === "auth") {
    const authStatus = await auth(doc, DB_MODEL, CONNECT_DB);
    
    return authStatus;
  }
  if (typeRequest === "reg") {
    const regStatus = await reg(doc, DB_MODEL, CONNECT_DB);
    return regStatus;
  }
  return;
}
module.exports = main;
