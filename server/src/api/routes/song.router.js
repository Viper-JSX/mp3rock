import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import getJanres from "../middleware/getJanres.js";
import { createSong, deleteSong, getSong, getSongAudio, getSongs, getSongsByJanre } from "../controllers/song.controller.js";

const router = new Router();

router
.get("/", getSongs)
.get("/:id", getSong)
.get("/:id/audio", getSongAudio)
.get("/janre/:janre", getSongsByJanre)
.post("/create", verifyToken, getJanres, createSong)
.delete("/:id", verifyToken, deleteSong);


export default router;