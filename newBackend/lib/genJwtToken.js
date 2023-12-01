const { sign, verify } = require("jsonwebtoken");
const { randomBytes } = require("crypto");

class Token {
  constructor(dataForSign = null, secretKey = null) {
    this.secret = secretKey;
    this.data = dataForSign;
  }

  generateSecret(sizeBytes) {
    return randomBytes(sizeBytes).toString("hex");
  }

  generateJwtToken(tokenLifeTime, secret = null) {
    const optionalData = !this.dataForSign
      ? { data: "не указана" }
      : this.dataForSign;
    const secretKey = !this.secret ? secret : this.secret;
    try {
      const token = sign(optionalData, secretKey, { expiresIn:tokenLifeTime });
      return { token, secretKey };
    } catch (e) {
      return { token: null, secretKey: null,e: e.message };
    }
  }
  tokenVerification(token, secret) {
    try {
      const resultVeification = verify(token, secret);
      return { resultVeification, valid:true };
    } catch (e) {
      return {valid:false, e: e.message};
    }
  }
}

module.exports = Token