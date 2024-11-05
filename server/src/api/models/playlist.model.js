import { Schema } from "mongoose";

const PlaylistSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    creator: {
        type: Schema.ObjectId | "community",
        default: "community"
    },

    songs: {
        type: [{ type: Schema.ObjectId, ref: "song" }]
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