import Joi from "joi";

export const scrollingPageSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string()
})