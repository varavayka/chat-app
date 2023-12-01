const { EventEmitter } = require("events");
const {v4: uuid} = require('uuid')
const GenJwtToken = require("../lib/genJwtToken");
const passwordHashing = require("../lib/passwordHashing");
const dbControlApi = require('./dbControlApi')
const apiRequestManagement = new EventEmitter();





module.exports = apiRequestManagement;


