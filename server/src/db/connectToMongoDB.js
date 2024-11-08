import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL;
        const conn = await mongoose.connect(MONGO_URL);
        console.log(MONGO_URL);
    } catch (err) {
        throw new Error("Cannot connect to MongoDB");
    }
}

export default connectToMongoDB;