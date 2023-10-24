require("dotenv").config({ path: ".env" });

const {Schema, model}  = require('mongoose')
module.exports = model(process.env.MONGO_DB_COLLECTIONS,new Schema({
    username: String,
    email: String,
    shortName: String,
    password: String,
    jwt: String,
    secretJwt: String,
    date: Date,
    salt: String,
    uuid: String
}))