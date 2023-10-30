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
  try {
    
    const resultVerifyToken = await (async () => verify(token, secret))()
    return {authorized: true, ...resultVerifyToken}
  } catch(e) {
   return {authorized: false, message: e.message}
  }
};

module.exports = { secretKey, signToken, verifyJwt };
