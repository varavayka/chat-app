const { sign, verify } = require("jsonwebtoken");
const { randomBytes } = require("crypto");

const secretKey = async (sizeKey = 256) => {
  try {
    return (await (async () => randomBytes(sizeKey))()).toString("hex");
  } catch (e) {
    return e.message;
  }
};
const signToken = async (data, secret, lifeTimeToken) => {
  const optionalData = { ...(data || {}) };
  const tokenLifeTime = { expiresIn: lifeTimeToken || "1h" };
  const signJwt = (async () =>
    sign({ ...optionalData }, secret, tokenLifeTime))();
  return { jwt: signJwt, secret };
};

const verifyJwt = async (token, secret) => {
  verify(token, secret, (err,result) => console.log(!result))
  // return resultVerify; //допилить по выводу ошибки!
};

module.exports = { secretKey, signToken, verifyJwt };
