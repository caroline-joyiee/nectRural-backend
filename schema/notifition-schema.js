import Joi from "joi";

export const notificationSchema = Joi.object({
    
    type: Joi.string(),
    message: Joi.string(),
    read: Joi.boolean(),
    createdAt: Joi.date(),
    
})