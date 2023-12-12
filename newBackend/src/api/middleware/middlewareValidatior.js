const { check, validationResult } = require("express-validator")

function initFieldValidation(fields, messages, checkMethods, maxMinArgs=null) {
    return fields.map((filed, index) => {
        return check(filed, messages[index])[checkMethods[index]](!maxMinArgs ? undefined : maxMinArgs)
    })
}


function checkingValidationResult(req,res, next) {
    const {errors} = validationResult(req)
    const resultValidation = errors.map(({msg, path, location}) => {
        return {msg, path, location}
    })
    if(!errors.length) {
        return next()
    }
    return res.status(400).json({validRequest:!!errors, resultValidation})
}

module.exports = {
    initFieldValidation,
    checkingValidationResult
}