require("dotenv").config({ path: "../.env" });
const { EventEmitter } = require("events");
const { v4: uuid } = require("uuid");
const GenJwtToken = require("../lib/genJwtToken");
const passwordHashing = require("../lib/passwordHashing");
const userModel = require("../models/UserModel");
const { connect } = require("mongoose");
const apiRequestManagement = new EventEmitter()
connect(process.env.MONGO_URL)
// .then(({conncet}) => {

  const validateToken = async (token,callback=null) => {
    
    const initValidationToken = new GenJwtToken()
    const tokenFind = await userModel.findOne({token})
    
    if(tokenFind) {
      const {secret} = tokenFind
      
      const validationResult  = initValidationToken.tokenVerification(token,secret)
      if(!callback) return {...validationResult, tokenFind:!!tokenFind}
      return callback({...validationResult, tokenFind:!!tokenFind})
    }
    if(!callback) return {tokenFind: !!tokenFind}
    return callback({tokenFind: !!tokenFind})
  }
  
  
  const logOut = async (token,callback) => {
    try {

      const initUpdateToken = await userModel.findOneAndUpdate({token},{token: ''})
      return callback({logout: !!initUpdateToken, userAuthorized: !!initUpdateToken})
    }catch(e) {
      return callback({logout: false, error: e})
    }
    // return callback(!initUpdateToken ? {logout:false, tokenFound:false} : {logout: !!initUpdateToken})
  }
  
  
  const registration = async ({email,password, ...otherKeys},callback) => {
    const findedUser = await userModel.findOne({email})
  
    if(!findedUser) {
      const {hash,secret} = await passwordHashing(password,256, 'sha256')
      const createUser = await userModel.create({email,password:hash(), secret, userId: uuid(), ...otherKeys})
      

      return callback({findedUser: !!findedUser,userСreated: !!createUser})
    }
    

    return callback({findedUser: !!findedUser,userCreated: false})
  }
  
  
  const authentication = async ({email,password},callback) => {

    try {
      const findedUser = await userModel.findOne({email})
      
      if(findedUser) {
        const {secret, password: registredUserPassword} = findedUser
        const {username,shortname,userId} = findedUser
        const {hash} = await passwordHashing(password,256, 'sha256')
        const passwordComparison = hash(secret) === registredUserPassword
        if(passwordComparison) {
          const initGenToken = new GenJwtToken({userId, username, shortname})
          const {token} = initGenToken.generateJwtToken('1d',secret)
          await userModel.findOneAndUpdate({email}, {token})
          
          return callback({ userAuthenticated: passwordComparison, token, findedUser: !!findedUser})
        }
        
        return callback({ userAuthenticated: passwordComparison, findedUser: !!findedUser})
        
      }
      
      return callback({findedUser: !!findedUser})
    }catch(e) {
      console.log(e.message)
    }
  
  }
  apiRequestManagement.on('registration', registration)
  apiRequestManagement.on('authentication', authentication)
  apiRequestManagement.on('authorization', validateToken)
  apiRequestManagement.on('logout', logOut)
// })


module.exports = {apiRequestManagement,validateToken}

