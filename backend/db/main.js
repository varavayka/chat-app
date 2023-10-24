require("dotenv").config({ path: "./.env" });
const { v4: uuid } = require("uuid");
const { connect } = require("mongoose");
const userModel = require("./schema/user");
const hashPass = require("../lib/hashingPass");

class DbController {
  constructor(userModel, close) {
    this.userModel = userModel;
    this.close = close;
  }

  set searchUser({ email }) {
    this.resultSearch = (async () => {
      try {
        const searchUser = await this.userModel.findOne({ email });
        if (!searchUser) {
          return { searchUser: false };
        }
        if (searchUser) {
          const { email } = searchUser;
          return { searchUser: true, email };
        }
      } catch (e) {
        return { error: true, errorMessage: e.message };
      }
    })();
  }
  get searchUser() {
    return this.resultSearch;
  }

  set authenticationHandler({ password, email }) {
    return (this.authenticationResult = (async () => {
      try {
        const searchUser = await this.userModel.findOne({ email });
        if (searchUser) {
          const { email, uuid, username, salt } = searchUser;
          const candidatePassword = await hashPass(password, null, true, salt);
          if (candidatePassword === searchUser.password) {
            // await connect(process.env.MONGO_DB_HOST).connection.close()
            return {
              userAuthenticated: true,
              userData: { email, id: uuid, username },
            };
          }
          return { userAuthenticated: false, message: "Permission denied" };
        }
      } catch (e) {
        return { error: true, errorMessage: e.message };
      }
    })());
  }
  get authenticationHandler() {
    return this.authenticationResult;
  }
  set registrationUser(candidate) {
    return (this.registrationResult = (async () => {
      try {
        const { password } = candidate;
        const { hash, salt } = await hashPass(password, 256);
        const preparationCandidate = {
          ...candidate,
          password: hash,
          salt,
          uuid: uuid(),
        };
        await this.userModel.create(preparationCandidate)
        return { registrationStatus: true };
      } catch (e) {
        cosnole.log(e)
        return {
          registrationStatus: false,
          error: true,
          errorMessage: e.message,
        };
      }
    })());
  }
  get registrationUser() {
    return this.registrationResult;
  }
  set updateUserDoc({jwt,secretJwt, email}) {
    return this.updateDoc =  (async() => {
      await this.userModel.updateOne({email}, {$set:{jwt,  secretJwt}})
    })()
  }
  
  set checkTokenRequest({uuid}) {
    return this.secretToken = (async () => {
      const {secretJwt, jwt} = await this.userModel.findOne({uuid})
      
      return {secretJwt, jwt}
    })()
  }

  get checkTokenRequest() {
    return this.secretToken
  }
}
module.exports = async function (candidate) {
  try {
    const { connection } = await connect(process.env.MONGO_DB_HOST);
    const db = new DbController(userModel, connection.close);
    db.searchUser = candidate;
    return db;
  } catch (e) {
    return e.message;
  }
};
