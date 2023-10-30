const db = require("../db/main");

const logout = async (req,res) => {
    const { authorization } = req.headers;
    const tokenRequest = authorization.split(" ")[1];
    const databaseQuery = await db();
    databaseQuery.checkTokenRequest = tokenRequest;
    const dbToken = await databaseQuery.checkTokenRequest;
    if (dbToken.tokenFound) {
        const {logout} = await databaseQuery.logout(tokenRequest)
        if(logout) {
            return res.status(200).json({logout})
        }
        if(!logout) {
            return res.status(400).json({logout})
        }
    }

    return res.status(400).send('Пользователь не авторизирован')
}

module.exports = logout