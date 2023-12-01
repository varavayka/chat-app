require("dotenv").config({ path: "../.env" });
const { EventEmitter } = require("events");
const { connect } = require("mongoose");

const userModel = require("../models/UserModel");

const dbControlConnection = new EventEmitter()
const dbControlApi = new EventEmitter();

dbControlConnection.on('createConnection', async (mode) => {
  

})

dbControlApi.on('createUser', () => {})
dbControlApi.on('updateUser', () => {})





module.exports = dbControlApi

