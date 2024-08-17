import Joi from "joi";


export const userProfileSchema =Joi.object({
  institionName: Joi.string(),
  about: Joi.string(),
  location: Joi.string(),
  contact: Joi.string(),
  googleUrl: Joi.string(),
  image: Joi.string(),
  profileimage:Joi.string()
})

