import Joi from "joi";


export const userProfileSchema =Joi.object({
  name: Joi.string(),
  about: Joi.string(),
  location: Joi.string(),
  contact: Joi.string(),
  googleUrl: Joi.string(),
  image: Joi.string(),
  profileImage:Joi.string()
})

