import { Schema, model } from "mongoose";

const PlaylistSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    songs: {
        type: [Schema.Types.ObjectId], 
        ref: "song",
        default: []
    },

    public: {
        type: Boolean,
        default: false
    },
}, {
        timestamps: { createdAt: true }
});

const Playlist = model("playlist", PlaylistSchema);

export default Playlist;