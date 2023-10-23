const db = require("../../db/main");

const registrationHandler = async (req, res) => {
  const userData = JSON.parse(JSON.stringify(req.body));
  const dbRequest = await db(userData);

  const { searchUser } = await dbRequest.searchUser;
  if (!searchUser) {
    dbRequest.registrationUser = userData;
    const { registrationStatus } = await dbRequest.registrationUser;
    console.log(registrationStatus)
    if (registrationStatus) {
      return res
        .status(200)
        .json({ registrationStatus, message: "Пользователь зарегистрирован" });
    }
    
    
  }
  if(searchUser) {
    return res
      .status(401)
      .json({
        message: "Пользователь существует",
      });

  }
};

module.exports = registrationHandler;
