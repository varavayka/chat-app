const db = require("../db/main")();

const logout = async (req,res) => {
    const { authorization } = req.headers;
    const tokenRequest = authorization.split(" ")[1];
    const {logOut} = await db;
    const {logout, tokenFound} = await logOut(tokenRequest);
    switch(true) {
        case tokenFound:
            if(logout) {
                return res.status(200).json({logout})
            }
            return res.status(400).json({logout})
        case !tokenFound:
            return res.status(400).send('Пользователь не авторизирован')

    }  
}

module.exports = logout