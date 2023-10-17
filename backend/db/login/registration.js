require("dotenv").config({
  path: "./.env",
  encoding: "latin1",
  debug: true,
  override: false,
});
const { v4: uuid } = require("uuid");

const hashingPass = require("../../lib/hashingPass");
const regSchema = require("../schema/regSchema");
const checkDoc = require("../checkDocDb");

async function registration(doc, model, connectDb) {
  try {
    const CHECK_DOC = await checkDoc(doc, model, connectDb);
    if (!CHECK_DOC.searchStatus) {
      const DOC_DB = JSON.parse(JSON.stringify(doc));
      const HASHING_DATA = await hashingPass(doc.password, 256);
      DOC_DB.password = HASHING_DATA.hash;
      DOC_DB.salt = HASHING_DATA.salt;
      DOC_DB.uuid = uuid();

      const INSER_DOC = await model(
        process.env.MONGO_DB_COLLECTIONS,
        regSchema
      );
      await INSER_DOC.create(DOC_DB);
      return { registrationStatus: true, error: false, username: DOC_DB.username };
    }
    return { registrationStatus: false, error: false };
  } catch (e) {
    return { registrationStatus: false, error: true, errorMessage: e.message };
  } finally {
    connectDb.connection.close();
  }
}

module.exports = registration;
