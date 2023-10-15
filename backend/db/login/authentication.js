const passHash = require("../../lib/hashingPass");
const checkDoc = require("../checkDocDb");
async function authentication(doc, model, connectDb) {
  const REPORT_AUTH = {
    passwordСonfirmed: false,
    error: false,
    foundUser: false,
  };
  try {
    const CHECK_DOC = await checkDoc(doc, model);

    if (CHECK_DOC.searchStatus) {
      const { salt, password } = CHECK_DOC.findDoc.find(
        (account) => account.email === doc.email
      );
      const requestAuthDoc = await passHash(doc.password, null, true, salt);
      if (requestAuthDoc === password) {
        REPORT_AUTH.passwordСonfirmed = true;
      }
      REPORT_AUTH.foundUser = true;

      return REPORT_AUTH;
    }
    if (!CHECK_DOC.searchStatus) {
      return REPORT_AUTH;
    }
  } catch (e) {
    REPORT_AUTH.error = true;
    REPORT_AUTH.errorMessage = e.message;
    return REPORT_AUTH;
  }
}

module.exports = authentication;
