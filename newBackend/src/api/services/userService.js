const { v4: uuid } = require("uuid");
require("dotenv").config({ path: "../.env" });

const userModel = require("../configs/models/UserModel");
const { connect } = require("mongoose");

const authService = require("./authService");
class UserService {
  constructor(dbModel, dbConncetion, dbUrl) {
    this.model = dbModel;
    this.connect = dbConncetion;
    this.dbUrl = dbUrl;
  }

  async createUser(candidate) {
    try {
      const { conncetion } = await this.connect(this.dbUrl);
      const { email, password } = candidate;

      const findedUser = await this.model.findOne({ email });

      if (!findedUser) {
        const { hash, secret } = authService.hashingPassword(password);

        const user = {
          ...candidate,
          password: hash,
          secret,
          userId: uuid(),
        };
        await this.model.create(user);
        await conncetion.close();
        return { userCreated: true };
      }
      return { userCreated: false, userFinded: false };
    } catch (e) {
      return { userCreated: false, userFinded: false, error: e.message };
    }
  }

  async updateUser(searchPattern, dataUpdate) {
    try {
      const { conncetion } = await this.connect(this.dbUrl);
      const updatedUser = await this.model.findOneAndUpdate(
        { ...searchPattern },
        { ...dataUpdate }
      );
      await conncetion.close();
      return { userUpdated: !!updatedUser };
    } catch (e) {
      return { userUpdated: false, error: e.message };
    }
  }
}

module.exports = new UserService(userModel, connect, process.env.MONGO_URL);
