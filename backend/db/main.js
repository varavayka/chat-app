require("dotenv").config();
const { v4: uuid } = require("uuid");
const { connect } = require("mongoose");
const userModel = require("./schema/user");
const hashPass = require("../lib/hashingPass");

  
const findUser = async (searchPattern) =>  await userModel.findOne(searchPattern)



class DbController {
  constructor(userModel, close, findUser, hashPass) {
    this.close = close;
    this.userModel = userModel;
    this.findUser = findUser
    this.passwordHashing = hashPass
  }
  async findAccount(email) {
    try {

      const resultFind = await this.userModel.findOne({ email })
      return !resultFind ? {resultFindUser: false} : { resultFindUser: true}

    } catch(e) {
        console.log(e.message)
      // return {error: true, errorMessage: e.message}
    }
  }

  async registrationCandidate(dataRequest) {
    try {

      const {password,email,username} = Object.assign({}, dataRequest)
      const resultFind = await findUser({email})

      if(!resultFind) {
        const {hash,salt} = await this.passwordHashing(password, 256)
        const preparationCandidate = {
          username,
          email,
          password: hash,
          salt,
          uuid: uuid(),
        };
        await this.userModel.create(preparationCandidate);
        return { registrationStatus: true ,userFound: true};
      }
      if(resultFind) {
        return { registrationStatus: false, userFound: true };
      }
      
    }catch(e) {
      return { registrationStatus: false, userFound: false, error:true, errorMessage: e.message };
    }

  }

  async userAuthentication(requestPassword, email) {
    try {
      
      const resultFind = await this.findUser({email})
      if(!resultFind) {
        return { userAuthenticated: false}
      }
      if(resultFind) {
        const {salt,password,uuid,email} = resultFind
        const computedHash = await this.passwordHashing(requestPassword, null, true, salt)
        return computedHash === password ? { userAuthenticated: true, data: {uuid,email}} : { userAuthenticated: false, passwordConfirmed: false}
      }
    }catch(e) {
      console.log(e.message)
      // return {error: true, errorMessage: e.message}
    }
  }
  async updateUser({jwt,secretJwt,email}) {
    return await this.userModel.updateOne({ email }, { $set: { jwt, secretJwt } })
  }

  async searchToken(requestToken) {
    try {

      const foundToken = await this.findUser({jwt: requestToken})
      if(!foundToken) {
        return { foundToken: false };
      }
      if(foundToken) {
        const {secretJwt} = foundToken
        return { foundToken: true, secretJwt };
      }
    } catch(e) {
      return {error:true, errorMessage: e.message}
    }
  }
  async logout(token) {
    try {
      await this.userModel.updateOne({ jwt: token }, { $set: { jwt: "" } });
      return { logout: true };
    } catch (e) {
      return { logout: false, error: e.message };
    }
  }

  // set searchUser({ email }) {
  //   this.resultSearch = (async () => {
  //     try {
  //       const searchUser = await this.userModel.findOne({ email });
  //       if (!searchUser) {
  //         return { searchUser: false };
  //       }
  //       if (searchUser) {
  //         const { email } = searchUser;
  //         return { searchUser: true, email };
  //       }
  //     } catch (e) {
  //       return { error: true, errorMessage: e.message };
  //     }
  //   })();
  // }
  // get searchUser() {
  //   return this.resultSearch;
  // }

  // set authenticationHandler({ password, email }) {
  //   return (this.authenticationResult = (async () => {
  //     try {
  //       const searchUser = await this.userModel.findOne({ email });
  //       if (searchUser) {
  //         const { email, uuid, username, salt } = searchUser;
  //         const candidatePassword = await hashPass(password, null, true, salt);
  //         if (candidatePassword === searchUser.password) {
  //           // await connect(process.env.MONGO_DB_HOST).connection.close()
  //           return {
  //             userAuthenticated: true,
  //             userData: { email, id: uuid, username },
  //           };
  //         }
  //         return { userAuthenticated: false, message: "Permission denied" };
  //       }
  //     } catch (e) {
  //       return { error: true, errorMessage: e.message };
  //     }
  //   })());
  // }
  // get authenticationHandler() {
  //   return this.authenticationResult;
  // }
  // set registrationUser(candidate) {
  //   return (this.registrationResult = (async () => {
  //     try {
  //       const { password } = candidate;
  //       const { hash, salt } = await hashPass(password, 256);
  //       const preparationCandidate = {
  //         ...candidate,
  //         password: hash,
  //         salt,
  //         uuid: uuid(),
  //       };
  //       await this.userModel.create(preparationCandidate);
  //       return { registrationStatus: true };
  //     } catch (e) {
  //       cosnole.log(e);
  //       return {
  //         registrationStatus: false,
  //         error: true,
  //         errorMessage: e.message,
  //       };
  //     }
  //   })());
  // }
  // get registrationUser() {
  //   return this.registrationResult;
  // }
  // set updateUserDoc({ jwt, secretJwt, email }) {
  //   return (this.updateDoc = (async () => {
  //     await this.userModel.updateOne({ email }, { $set: { jwt, secretJwt } });
  //   })());
  // }

  // set checkTokenRequest(jwtRequest) {
  //   return (this.secretToken = (async () => {
  //     try {
  //       const getJwt = await this.userModel.findOne({ jwt: jwtRequest });
  //       if (getJwt) {
  //         const { secretJwt } = getJwt;
  //         return { tokenFound: true, secretJwt };
  //       }
  //       return { tokenFound: false };
  //     } catch (e) {
  //       return { error: true, errorMessage: e.message };
  //     }
  //   })());
  // }

  // get checkTokenRequest() {
  //   return this.secretToken;
  // }

  async logout(token) {
    try {
      await this.userModel.updateOne({ jwt: token }, { $set: { jwt: "" } });
      return { logout: true };
    } catch (e) {
      return { logout: false, error: e.message };
    }
  }
}
module.exports = async function () {
  try {
    const { connection } = await connect(process.env.MONGO_DB_HOST);
    return new DbController(userModel, connection.close, findUser, hashPass);
  } catch (e) {
    return e.message;
  }
};
