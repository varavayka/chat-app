const db = require("../../db/main");
const { validationResult } = require("express-validator");
const registrationHandler = async (req, res) => {
  try {
    const checkValidCredentials = validationResult(req);
    if (!checkValidCredentials.isEmpty()) {
      return res.status(400).json(checkValidCredentials);
    }

    const userData = JSON.parse(JSON.stringify(req.body));
    const dbRequest = await db(userData);

    const { searchUser } = await dbRequest.searchUser;
    if (!searchUser) {
      dbRequest.registrationUser = userData;
      const { registrationStatus } = await dbRequest.registrationUser;
      if (registrationStatus) {
        return res
          .status(200)
          .json({
            registrationStatus,
            message: "Пользователь зарегистрирован",
          });
      }
    }
    if (searchUser) {
      return res.status(401).json({
        message: "Пользователь существует",
      });
    }
  } catch (e) {
    console.log(e.message)
  }
};

module.exports = registrationHandler;
