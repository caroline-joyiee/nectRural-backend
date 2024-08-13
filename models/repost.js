import { toJSON } from "@reis/mongoose-to-json";
import { model, Schema, Types } from "mongoose";


const repostSchema = new Schema({
    scrollingPage_Model: { type: Types.ObjectId, ref:'ScrollingPage'},
    message: { type: String}
},{
    timestamps: true
}) 

repostSchema.plugin(toJSON)
export const repost_Model = model('Repost', repostSchema)