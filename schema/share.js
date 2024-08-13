import Joi from "joi";

export const shareSchema = Joi.object({
    platform:Joi.string(),
    message: Joi.string()
})