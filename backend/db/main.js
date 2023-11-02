require("dotenv").config();
const { v4: uuid } = require("uuid");
const { connect } = require("mongoose");
const userModel = require("./schema/user");
const hashPass = require("../lib/hashingPass");
const { secretKey, signToken } = require("../lib/generateJwt");

const findDoc = async (pattern) => await userModel.findOne(pattern)
const addUser = async (user) =>  await userModel.create(user)
const updateUserData = async ( newData, pattern) => await userModel.updateOne(pattern, { $set: newData })
const checkToken = async (findDoc) => {
  return !findDoc ? { tokenFound: false } : { tokenFound: true, secretJwt:findDoc.secretJwt }
}
const logOut = async (token) => {
  if(await findDoc({jwt:token})) {
    await updateUserData({jwt: ''},{jwt: token})
    return {logout: true, tokenFound: true}
  }
  return {logout:false, tokenFound: false}
  // return logout
}
const preparationCandidate = async ({password,email,username},  saltSize) => {
  try {
    const {hash,salt} = await hashPass(password, saltSize)
    return {email,password:hash, salt, username} 

  }catch(e) {
    console.log(e.message)
  }
}

const registration = async (resultFind, preparationCandidate) => {
  try {
    if(!resultFind) {
      await addUser(preparationCandidate)
      return { registrationStatus: true}
    }
    if(resultFind) {
      return { registrationStatus: false};
    }
  } catch(e) {
    console.log(e.message)
    return { registrationStatus: false};
  }
}
const authentication = async (resultFind, requestPassword) => {
  try {
    
    if(resultFind) {
      const {salt,password,uuid,email} = resultFind
      const computedHash = await hashPass(requestPassword, null, true, salt)
      
      if(computedHash === password) {
        const { jwt, secret } = await signToken({uuid,email}, (await secretKey(256)),  "1m")
        await updateUserData({ jwt, secretJwt:secret }, {email});
        return { userAuthenticated: true, jwt, resultFindUser: true}
      }
      if(computedHash !== password) {
        
        return { userAuthenticated: false, resultFindUser: true}
      }
    }
    if(!resultFind) {
      return { resultFindUser: false}
    }
  }catch(e) {
    console.log(e.message)
    // return {error: true, errorMessage: e.message}
  }

}

module.exports = async function () {
  try {
    await connect(process.env.MONGO_DB_HOST);
    return {registration,authentication, preparationCandidate, findDoc,addUser, updateUserData, checkToken, logOut}
  } catch (e) {
    return e.message;
  }
};
