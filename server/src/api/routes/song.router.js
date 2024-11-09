import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createSong, deleteSong, getSong, getSongAudio, getSongsByJanre } from "../controllers/song.controller.js";

const router = new Router();

router
.get("/:id", getSong)
.get("/:id/audio", getSongAudio)
.get("/janre/:janre", getSongsByJanre)
.post("/create", verifyToken, createSong)
.delete("/:id", deleteSong);


export default router;