require("dotenv").config({ path: "../.env" });
const { EventEmitter } = require("events");
const { v4: uuid } = require("uuid");
const GenJwtToken = require("../lib/genJwtToken");
const passwordHashing = require("../lib/passwordHashing");
const userModel = require("../models/UserModel");
const { connect } = require("mongoose");
const apiRequestManagement = new EventEmitter();

apiRequestManagement.on("registration", async ({email, password, otherKeys}, callback) => {
  try {
    const { connection } = await connect(process.env.MONGO_URL);
    const userFound = await userModel.findOne({email});
    if (!userFound) {
      const { hash, secret } = await passwordHashing(password, 256, "sha256");
      const registrationResult = await userModel.create({...otherKeys, password:hash(), userId:uuid() , secret, email});
      await connection.close();
      return callback({userFound:!!userFound, registrationStatus: !!registrationResult,});
    }
    await connection.close();
    return callback({ userFound: !!userFound, registrationStatus: false });
  } catch (e) {
    return callback({ userFound: false, registrationStatus: false, error: e });
  }
});

apiRequestManagement.on(
  "authentication",
  async ({ email, password }, callback) => {
    try {
      const { connection } = await connect(process.env.MONGO_URL);
      const checkUserDb = await userModel.findOne({ email });
      if (checkUserDb) {
        const {
          secret,
          password: passwordDbUser,
          username,
          shortname,
        } = checkUserDb;
        const { hash } = await passwordHashing(password, 256, "sha256");
        const hashingRequestPassword = hash(secret);

        if (hashingRequestPassword === passwordDbUser) {
          const initGenerateToken = new GenJwtToken({
            email,
            username,
            shortname,
          });
          const { token } = initGenerateToken.generateJwtToken("1d", secret);

          await userModel.findOneAndUpdate({ email }, { token });
          await connection.close();
          return callback({
            userFound: !!checkUserDb,
            authenticationStatus: hashingRequestPassword === passwordDbUser,
            token,
          });
        }
        await connection.close();
        return callback({
          userFound: !!checkUserDb,
          authenticationStatus: hashingRequestPassword === passwordDbUser,
        });
      }
      await connection.close();
      return callback({
        userFound: !!checkUserDb,
        authenticationStatus: false,
      });
    } catch (e) {
      return callback({
        userFound: false,
        authenticationStatus: false,
        error: e,
      });
    }
  }
);

apiRequestManagement.on("authorization", async (token, callback) => {
  try {
    const { connection } = await connect(process.env.MONGO_URL);

    const tokenFound = await userModel.findOne({ token });

    if (tokenFound?.token) {
      const { secret } = tokenFound;
      const initGenerateToken = new GenJwtToken();
      const { valid, resultVeification } = initGenerateToken.tokenVerification(
        token,
        secret
      );

      if (valid) {
        await connection.close();
        return callback({ valid, resultVeification });
      }
      await connection.close();
      return callback({ valid, resultVeification });
    }
    await connection.close();
    return callback({ tokenFound: !!tokenFound });
  } catch (e) {
    return callback({ tokenFound: false, error: e });
  }
});
apiRequestManagement.on("logout", async (token, callback) => {
  try {
    const { connection } = await connect(process.env.MONGO_URL);
    const tokenFoundAndClear = await userModel.findOneAndUpdate(
      { token },
      { token: "" }
    );

    if (tokenFoundAndClear) {
      await connection.close();
      return callback({ cleared: !!tokenFoundAndClear });
    }
    await connection.close();
    return callback({
      tokenFound: !!tokenFoundAndClear,
      cleared: !!tokenFoundAndClear,
    });
  } catch (e) {
    return callback({ tokenFound: false, error: e });
  }
});
module.exports = apiRequestManagement;