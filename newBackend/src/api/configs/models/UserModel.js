const { Schema, model } = require("mongoose");
require('dotenv').config({path:'../.env'})

const userSchema = new Schema({
    
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    shortname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateRegistration: {
      type: Date,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
    secret: {
      type: String,
      required: false
    }
  })

module.exports = model(process.env.MONGO_DB_COLLECTIONS,userSchema);
