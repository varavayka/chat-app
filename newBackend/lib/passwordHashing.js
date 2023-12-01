const { randomBytes, createHmac } = require("node:crypto");

async function passwordHashing(password, sizeSecret, algorithm) {
  const secret = randomBytes(sizeSecret).toString("hex");
  const hash = (salt = null) =>
    createHmac(algorithm, !salt ? secret : salt)
      .update(password)
      .digest("hex");
  return { password, secret, hash };
}
module.exports = passwordHashing;
