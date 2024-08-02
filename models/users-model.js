import { model, Schema } from "mongoose";

import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({

  userName: { type: String},
  email: { type: String},
  password: { type: String}
},{
    timestamps:true
})

userSchema.plugin.toJSON;
export const User = model('user', userSchema);

