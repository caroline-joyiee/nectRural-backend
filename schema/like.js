import Joi from "joi";

export const likeSchema = Joi.object({
    comment:Joi.string()
})