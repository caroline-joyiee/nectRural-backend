import Joi from "joi";

export const repostSchema = Joi.object({
    message:Joi.string()
})