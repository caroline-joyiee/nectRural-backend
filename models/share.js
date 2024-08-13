import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const shareSchema = new Schema({
    scrollingPage_Model: { type: Types.ObjectId, ref:'ScrollingPage'},
    platform: { type: String },
    message: { type: String}

},{
    timestamps: true
})

shareSchema.plugin(toJSON)
export const share_Model = model('Share', shareSchema)