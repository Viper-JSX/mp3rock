import { model, Schema } from "mongoose";

import { janres } from "../../lib/constants/janres.js";

const SongSchema = new Schema({
    name: {
        type: String,
        reqired: true
    },

    creator: {
        type: String,
        ref: "user",
        required: true
    },

    artist: {
        type: String,
        required: true
    },

    janre: {
        type: Schema.Types.ObjectId,
        ref: "janre",   
        required: true,
    },

    file: {
        type: String,
        required: true
    },

    
}, {
    timestamps: { createdAt: true }
});

const Song = model("song", SongSchema);

export default Song;