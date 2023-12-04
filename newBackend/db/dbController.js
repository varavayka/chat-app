require("dotenv").config({ path: "../.env" });
const { EventEmitter } = require("events");
const {v4: uuid} = require('uuid')
const GenJwtToken = require("../lib/genJwtToken");
const passwordHashing = require("../lib/passwordHashing");
const userModel = require('../models/UserModel')
const {connect} = require('mongoose')
const apiRequestManagement = new EventEmitter();

apiRequestManagement.on('registration', async (document, callback) => {
    try {
        const {connection} = await connect(process.env.MONGO_URL)
        const checkUserDb = await userModel.findOne({email:document.email})
        if(!checkUserDb) {
            const {email, password, shortname,username} = document
            const {hash, secret} = await passwordHashing(password, 256, 'sha256')
            const preparationDocument = {
                email,
                password: hash(),
                secret,
                shortname,
                username,
                userId: uuid()
            }
            const registrationResult = await userModel.create(preparationDocument)
            await connection.close()
            return callback({userFound: !!checkUserDb, registrationStatus: !!registrationResult})
        }
        await connection.close()
        return callback({userFound:!!checkUserDb, registrationStatus: false})

    } catch(e) {
        return callback({userFound:false, registrationStatus: false, error: e})
    }

})



apiRequestManagement.on('authentication', async ({email, password}, callback) => {
    try {
        const {connection} = await connect(process.env.MONGO_URL)
        const checkUserDb = await userModel.findOne({email})
        if(checkUserDb) {
            const {secret, password: passwordDbUser, username, shortname} = checkUserDb
            const {hash} = await passwordHashing(password, 256,'sha256')
            const hashingRequestPassword = hash(secret)

            if(hashingRequestPassword === passwordDbUser) {
                const initGenerateToken = new GenJwtToken({email, username, shortname})
                const {token} = initGenerateToken.generateJwtToken('1d', secret)
                
                await userModel.findOneAndUpdate({email}, {token})
                await connection.close()
                return callback({userFound: !!checkUserDb, authenticationStatus: hashingRequestPassword === passwordDbUser, token})
            }
            await connection.close()
            return callback({userFound: !!checkUserDb, authenticationStatus: hashingRequestPassword === passwordDbUser})
        }
        await connection.close()
        return callback({userFound:!!checkUserDb, authenticationStatus: false})

    } catch(e) {
        return callback({userFound:false, authenticationStatus: false, error: e})
    }

})

apiRequestManagement.on('authorization', async (token, callback) => {
    try {
        const {connection} = await connect(process.env.MONGO_URL)
        
        const tokenFound = await userModel.findOne({token})
        
        if(tokenFound?.token) {
            const {secret} = tokenFound
            const initGenerateToken = new GenJwtToken()
            const {valid, resultVeification} = initGenerateToken.tokenVerification(token,secret)
    
            if(valid) {
                await connection.close()
                return callback({valid,resultVeification})
            }
            await connection.close()
            return callback({valid,resultVeification})
    
        }
        await connection.close()
        return callback({tokenFound: !!tokenFound})

    } catch(e) {
        return callback({tokenFound: false,  error:e })

    }
})  
const test = {email:'konevski2012@gmail.com', password:'FSociety420', username:'kirill', shortname:'@kirill'}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtvbmV2c2tpMjAxMkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImtpcmlsbCIsInNob3J0bmFtZSI6IkBraXJpbGwiLCJpYXQiOjE3MDE2OTg3NjEsImV4cCI6MTcwMTc4NTE2MX0.kYshgIJ4FGnHJeK876KIAGXT75j-DTh6duFLyzP_EIw'
// apiRequestManagement.emit('registration', test, (report) => console.log(report))
// apiRequestManagement.emit('authentication', {email:test.email, password:test.password}, (report) => console.log(report))

apiRequestManagement.emit('authorization',token, result => console.log(result) )








module.exports = apiRequestManagement;
