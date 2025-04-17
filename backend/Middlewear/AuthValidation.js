const joi = require('joi');

const signupValidate= (req, res, next) => {
    const schema = joi.object({
        name: joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({message:"bad request",error})
    }
    next();
}

const loginValidation = (req, res, next) => {
     const schema = joi.object({
        password: joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
     });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({message:"bad request",error})
    }
    next();
}

module.exports = {
    loginValidation,signupValidate
}