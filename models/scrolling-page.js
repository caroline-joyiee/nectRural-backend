import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const scrollingPageSchema = new Schema({
    title: { type: String},
    description: { type: String},
    image: { type: String},
    user_Model: { type: Types.ObjectId, ref: 'User'}

},{
  timestamps: true
});

scrollingPageSchema.plugin(toJSON)
export const scrollingPage_Model = model('scrolling', scrollingPageSchema)