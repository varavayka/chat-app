const { randomBytes, createHmac } = require("node:crypto");
const jsonwebtoken = require('jsonwebtoken')

class AuthService {

    constructor(algorithm='sha256', hashEncoding='hex', expiresIn='1d') {
        this.algorithm = algorithm
        this.encoding = hashEncoding
        this.tokenLifeTime = expiresIn
    }

    hashingPassword(password, manualSecret=null) {
        const secret = randomBytes(50).toString(this.encoding)
        const initCreateHash = createHmac(this.algorithm, manualSecret || secret)
        const hash = initCreateHash.update(password).digest(this.encoding)
        return {hash,secret}
    }

    hashMatch(candidateHash, dbhash,secret, attachedData={data:'no data'}) {

        if(candidateHash === dbhash) {
            const signToken = jsonwebtoken.sign(attachedData,secret,{expiresIn:this.tokenLifeTime})
            return {token:signToken, userAuthenticated:true}
        }
        return {userAuthenticated: false}
    }
    verificationToken(token, secret) {
        try {
            const verificationToken = jsonwebtoken.verify(token,secret)
            return {userAuthorized: !!verificationToken}
        } catch(e) {
            return {userAuthorized: false, error: e.message}
        }


    }
}

module.exports = new AuthService()

