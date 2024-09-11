import { model, Schema, Types } from "mongoose";

import { toJSON } from "@reis/mongoose-to-json";



const userSchema = new Schema({

  userName: { type: String},
  email: { type: String},
  password: { type: String},
  confirmPassword: {type: String},
  profile: { type: Types.ObjectId, ref: 'Profile'}

},{
    timestamps:true
})

userSchema.plugin(toJSON);
export const User_Model = model('User', userSchema);

