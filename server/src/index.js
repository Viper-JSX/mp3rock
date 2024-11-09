import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./api/routes/auth.router.js";
import playlistRouter from "./api/routes/playlist.router.js";
import songRouter from "./api/routes/song.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/songs", songRouter);


app.listen(PORT, () => {
    connectToMongoDB()
    .then(() => {
        console.log("Connected to mongodb");
    }) .catch((err) => {
        console.log(err);
        process.exit(0);
    })
});