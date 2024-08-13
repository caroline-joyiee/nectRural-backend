import Joi from "joi";


export const userSchema = Joi.object({
    userName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref('password')
})
