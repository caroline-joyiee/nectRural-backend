import { toJSON } from "@reis/mongoose-to-json";
import { model, Schema, Types } from "mongoose";


const likeSchema = new Schema ({
    scrollingPage_Model: {type: Types.ObjectId, ref: 'ScrollingPage'},
    userId: { type: String}
},{
    timestamps: true
})

likeSchema.plugin(toJSON);
export const like_Model = model('Like', likeSchema)