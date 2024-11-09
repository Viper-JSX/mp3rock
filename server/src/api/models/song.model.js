import { model, Schema } from "mongoose";

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

    file: {
        type: String,
        required: true
    },

    
}, {
    timestamps: { createdAt: true }
});

const Song = model("song", SongSchema);

export default Song;