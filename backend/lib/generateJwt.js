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
  const tokenLifeTime = { expiresIn: lifeTimeToken || "1m" };
  const signJwt = await (async () => sign({ ...optionalData }, await secret, tokenLifeTime))();
  return { jwt:  signJwt, secret };
};

const verifyJwt = async (token, secret) => {
  try {
    
    const resultVerifyToken = await (async () => verify(token, secret))()
    
    return {authorized: true, ...resultVerifyToken}
  } catch(e) {
    console.log(e.message)

    return {authorized: false, message: e.message}
  }
};

module.exports = { secretKey, signToken, verifyJwt };
