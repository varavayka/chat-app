const { v4: uuid } = require("uuid");
require("dotenv").config();

const userModel = require("../configs/models/UserModel");
const { connect } = require("mongoose");

const authService = require("./authService");
class UserService {

  async createUser(candidate) {
    try {
      const { connection } = await connect(process.env.MONGO_URL);
      const { email, password } = candidate;

      const findedUser = await userModel.findOne({ email });
      
      if (!findedUser) {
        const { hash, secret } = authService.hashingPassword(password);

        const user = {
          ...candidate,
          password: hash,
          secret,
          userId: uuid(),
        };
        await userModel.create(user);
        await connection.close();
        return { userCreated: true };
      }
      return { userCreated: false, userFinded: false };
    } catch (e) {
      console.log(e)
      return { userCreated: false, userFinded: false, error: e.message };
    }
  }

  async updateUser(searchPattern, dataUpdate) {
    try {
      const { connection } = await connect(process.env.MONGO_URL);
      const updatedUser = await userModel.findOneAndUpdate(
        { ...searchPattern },
        { ...dataUpdate }
      );
      await connection.close();
      return { userUpdated: !!updatedUser };
    } catch (e) {
      return { userUpdated: false, error: e.message };
    }
  }

  async matchPassword(searchPattern, password) {
    try {
      const { connection } = await connect(process.env.MONGO_URL);

      const userFound = await userModel.findOne(searchPattern)
      
      if(userFound) {
        const {password:dbUserHash,secret} = userFound
        const {hash:hashCandidate} = authService.hashingPassword(password, secret)
        const {token, userAuthenticated} = authService.hashMatch(hashCandidate,dbUserHash, secret)
        
        await connection.close()
        return {token, userAuthenticated}
      }
      return {token: null, userAuthenticated: false}

    } catch(e) {
      return {token: null, userAuthenticated: false, error: e.message}
    }

  }
  async checkToken(searchPattern) {
    try {
      const { connection } = await connect(process.env.MONGO_URL);
      
      const {secret, token} = await userModel.findOne(searchPattern)
      await connection.close()
      return {tokenFound: !!token, token, secret}
    } catch(e) {
      return {tokenFound: false}
    }
    
  }
}

module.exports = new UserService();


