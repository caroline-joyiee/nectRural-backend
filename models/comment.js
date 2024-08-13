import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
// import { scrollingPage_Model } from "./scrolling-page.js";


const commentSchema = new Schema({
  scrollingPage_Model: {type: Types.ObjectId, ref:"ScrollingPage" },
    comment: {type: String}
},{
    timestamps: true
})
commentSchema.plugin(toJSON)
export const comment_Model = model('comment', commentSchema)