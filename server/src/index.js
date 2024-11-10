import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./api/routes/auth.router.js";
import playlistRouter from "./api/routes/playlist.router.js";
import songRouter from "./api/routes/song.router.js";
import janresRouter from "./api/routes/janres.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/songs", songRouter);
app.use("/api/janres", janresRouter);


app.listen(PORT, () => {
    connectToMongoDB()
    .then(() => {
        console.log("Connected to mongodb");
    }) .catch((err) => {
        console.log(err);
        process.exit(0);
    })
});