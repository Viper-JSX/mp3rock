import { model, Schema } from "mongoose";
import validateEmail from "../../lib/utilities/validateEmail.js";

const UserSchema = new Schema({
    username: {
        type: String,
        required: "Username is required"
    },

    email: {
        type: String, 
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [ validateEmail, "Enter the correct email" ]
    },

    passwordHash: {
        type: String,
        required: true
    },

    playlists: {
        type: [Schema.Types.ObjectId],
        ref: "playlists"
    },

    savedPlaylists: {
        type: [Schema.Types.ObjectId],
        ref: "playlists",
        default: []
    }
}, {
    timestamps: { createdAt: true }
});

const User = model("user", UserSchema);

export default User;