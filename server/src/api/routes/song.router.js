import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import getJanreNames from "../middleware/getJanreNames.js";
import { createSong, deleteSong, getSong, getSongAudio, getSongs, getSongsByJanre } from "../controllers/song.controller.js";

const router = new Router();

router
.get("/", getSongs)
.get("/:id", getSong)
.get("/:id/audio", getSongAudio)
.get("/janre/:janre", getSongsByJanre)
.post("/create", verifyToken, getJanreNames, createSong)
.delete("/:id", verifyToken, deleteSong);


export default router;