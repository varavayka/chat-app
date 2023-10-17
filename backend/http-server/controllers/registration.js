const db = require("../../db/main");

const registrationHandler = async (req, res) => {
  const userData = JSON.parse(JSON.stringify(req.body));
  const dbRequest = await db(userData, "reg");
  console.log(dbRequest);
  if (dbRequest.registrationStatus)
    return res
      .status(200)
      .send(
        JSON.stringify({
          registrationStatus: dbRequest.registrationStatus,
          type: "registration",
        })
      );
  if (!dbRequest.registrationStatus)
    return res
      .status(200)
      .send(
        JSON.stringify({
          registrationStatus: dbRequest.registrationStatus,
          type: "registration",
        })
      );
  if (dbRequest.error)
    return res
      .status(502)
      .send(
        JSON.stringify({
          registrationStatus: false,
          error: dbRequest.error,
          type: "registration",
        })
      );
};

module.exports = registrationHandler;
