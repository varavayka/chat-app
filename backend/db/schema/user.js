require("dotenv").config();

const { Schema, model } = require("mongoose");
module.exports = model(
  process.env.MONGO_DB_COLLECTIONS,
  new Schema({
    username: String,
    email: String,
    shortname: String,
    password: String,
    jwt: String,
    secretJwt: String,
    date: Date,
    salt: String,
    uuid: String,
  })
);
