import { Router } from "express";
import { addPlaylistToSaved, addSongToPlaylist, createPlaylist, deletePlaylist, getPlaylist, getPlaylists, getPlaylistSongs, removeSongFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const router = new Router();

router
.get("/", verifyToken, getPlaylists)
.get("/:id", verifyToken, getPlaylist)
.get("/:id/songs", getPlaylistSongs)
.post("/create", verifyToken, createPlaylist)
.put("/:id/update", verifyToken, updatePlaylist)
.put("/:id/add-song", verifyToken, addSongToPlaylist)
.put("/:id/remove-song", verifyToken, removeSongFromPlaylist)
.put("/:id/add-to-saved", verifyToken, addPlaylistToSaved)
.delete("/:id", verifyToken, deletePlaylist);

export default router;