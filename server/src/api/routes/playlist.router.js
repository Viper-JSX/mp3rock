import { Router } from "express";
import { addSongToPlaylist, createPlaylist, deletePlaylist, getPlaylist, getPlaylistSongs, removeSongFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const router = new Router();

router
.get("/:id", verifyToken, getPlaylist)
.get("/:id/songs", getPlaylistSongs)
.post("/create", verifyToken, createPlaylist)
.put("/:id/update", verifyToken, updatePlaylist)
.put("/:id/add-song", verifyToken, addSongToPlaylist)
.put("/:id/remove-song", verifyToken, removeSongFromPlaylist)
.delete("/:id", verifyToken, deletePlaylist);

export default router;