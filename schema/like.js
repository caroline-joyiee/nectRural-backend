import Joi from "joi";

export const likeSchema = Joi.object({
    userId:Joi.boolean()
})