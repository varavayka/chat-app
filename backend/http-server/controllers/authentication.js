const db = require('../../db/main')
const generateJwt = require('../../lib/jwt')
const authenticationHandler = async (req, res) => {
    // console.log(req.body)
    // res.status(301).send(JSON.stringify({statusPermisson: true}))
    const doc = JSON.parse(JSON.stringify({email:req.body.email, password:req.body.password}))
    
    const dbRequest = await db(doc, 'auth')
    
    if(!dbRequest.passwordСonfirmed || !dbRequest.foundUser)  return res.status(401).send(JSON.stringify({permissonAccess: false, type: ' authentication'}))
    if(dbRequest.passwordСonfirmed)  return res.status(301).send(JSON.stringify({permission:true, jwt: 'kirillKonevskikhId123!@#',type: ' authentication' }))
       
   
};

module.exports = authenticationHandler;
