const Joi = require('@hapi/joi');

const registerValidation = (user) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().min(11).max(255).required(),
        password: Joi.string().min(3).max(1024).required(),
    }).options({ abortEarly: false });
    return JoiSchema.validate(user);
}

const loginValidation = (user) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().min(11).max(255).required(),
        password: Joi.string().min(3).max(1024).required(),
    }).options({ abortEarly: false });
    return JoiSchema.validate(user);
}

module.exports = {
    registerValidation,
    loginValidation,
}