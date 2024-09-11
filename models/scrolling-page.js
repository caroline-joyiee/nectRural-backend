import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const scrollingPageSchema = new Schema({
    title: { type: String},
    description: { type: String},
    image: { type: String},
    user: { type: Types.ObjectId, ref: 'User'},
    like:[{ type:Types.ObjectId, ref:'Like'}],
    comment:[{type: Types.ObjectId, ref:" Comment "}]

},{
  timestamps: true
});

scrollingPageSchema.plugin(toJSON)
export const scrollingPage_Model = model('scrolling', scrollingPageSchema)