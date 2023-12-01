const { createHmac, randomBytes } = require("node:crypto");

function hashPass(password, sizeByte = null, checkHash = false, salt = null) {
  return new Promise((resolve, reject) => {
    try {
      if (checkHash) {
        return resolve(
          createHmac("sha256", salt).update(password).digest("hex")
        );
      }
      const generateSalt = randomBytes(sizeByte).toString("hex");
      resolve({
        hash: createHmac("sha256", generateSalt).update(password).digest("hex"),
        salt: generateSalt,
      });
    } catch (e) {
      reject(e);
    }
  });
}
module.exports = hashPass;
