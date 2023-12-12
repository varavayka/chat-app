const dbRequest = require('../db/main')
async function userSearch(req,res) {
    const {findDoc}  = await dbRequest()
    const {userId} = req.query
    const {_id} = await findDoc({shortname:userId})
    if(_id) {
        return res.status(200).json({userFinded:true,id:_id })
    }
    if(!_id) {
        return res.status(200).json({userFinded: false})
    }
}

module.exports =  userSearch