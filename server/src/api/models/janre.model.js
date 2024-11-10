import mongoose from "mongoose";

const janreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Janre = mongoose.model("janre", janreSchema);

export default Janre;