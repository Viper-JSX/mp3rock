import { createSong, deleteSong, getSong, getSongAudio, getSongsByJanre } from "../controllers/song.controller";

const { Router } = require("express");

const router = new Router();

router
.get("/:id", getSong)
.get("/:id/audio", getSongAudio)
.get("/janre/:janre", getSongsByJanre)
.post("/create", createSong)
.delete("/:id", deleteSong);


export default router;