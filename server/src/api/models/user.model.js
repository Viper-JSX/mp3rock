import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    playlists: {
        type: [{
            type: Schema.ObjectId,
            ref: "playlists"
        }]
    }
}, {
    timestamps: { createdAt: true }
});

const User = model("user", UserSchema);

export default User;