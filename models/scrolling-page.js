import { Model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const scrollingPageSchema = new Schema({
    search: { type: {
        query: String,
        filter: [String]
    }},
    description: { type: String},
    image: { type: String}


})