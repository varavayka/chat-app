require("dotenv").config({
  path: ".env",
  encoding: "latin1",
  debug: true,
  override: false,
});
const regSchema = require("./schema/regSchema");

async function checkDoc(doc, model) {
  try {
    const findDoc = await (
      await model(process.env.MONGO_DB_COLLECTIONS, regSchema)
    ).find({});

    const findedDoc = findDoc.filter((account) =>
      account.email === doc.email ? 1 : 0
    );

    if (findedDoc.length === 0) {
      return { searchStatus: false, error: false, findDoc };
    }

    return { searchStatus: true, error: false, findDoc };
  } catch (e) {
    return { searchStatus: false, error: true, errorMessage: e.message };
  }
}

module.exports = checkDoc;
