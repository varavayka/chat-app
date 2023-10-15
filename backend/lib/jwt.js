const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");

function generateRandomSecret(sizeByte) {
  return new Promise((resolve, reject) => {
    randomBytes(sizeByte, (err, buffer) =>
      err ? reject(err) : resolve(buffer.toString("hex"))
    );
  });
}
function createJwtToken(data, secret, lifeTimeToken) {
  return new Promise((resolve, reject) => {
    jwt.sign({ ...data }, secret, { expiresIn: lifeTimeToken }, (err, token) =>
      err ? reject(err) : resolve(token)
    );
  });
}

async function main(data) {
  /*
    пример объекта передаваемого в вызов функции генерации токена
    @param {{ data: "secret key", lifeTimeToken: "1d" }}
  */
  const secretKey = await generateRandomSecret(256);
  const tokenAndSecret = {
    jwt: await createJwtToken(data, secretKey, data.lifeTimeToken),
    secretJwt: secretKey,
  };
  return tokenAndSecret;
}
module.exports = main;
// jwt.verify(token, "secret", (err, result) => {
//   console.log(result);
// });
