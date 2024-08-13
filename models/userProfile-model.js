import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userProfileSchema = new Schema({
    name: {type: String},
    about: { type: String},
    location: { type: String },
    contact: {type: String },
    googleUrl: { 
        type: String,
        match: [/^https?:\/\/(www\.)?google\.[a-z]{2,}\/?/, 'Please enter a valid Google URL'] 
    },
    image: {type: String}
    // profileimage: { type: String }

},{
    timestamps: true
})

userProfileSchema.plugin(toJSON);
export const userProfile = model('Profile', userProfileSchema);