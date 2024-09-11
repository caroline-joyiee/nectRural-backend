import mongoose, { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const notificationSchema = new Schema({
    type: {type: String},
    message: {type: String},
    read: { type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now },
    data: {type: mongoose.Schema.Types.Mixed, default: {} },
    user: { type: Types.ObjectId, ref: 'User'}
},{
    timestamps: true
})

notificationSchema.plugin(toJSON)
export const notificationModel = model('Notification', notificationSchema)