const {Schema}  = require('mongoose')



const regSchema = new Schema({
    userName: String,
    email: String,
    shortName: String,
    password: String,
    secretJwt: String,
    date: Date,
    salt: String,
    uuid: String
})

module.exports = regSchema
