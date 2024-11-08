import { Router } from "express";
import { createPlaylist, deletePlaylist, getPlaylist, getPlaylistSongs, updatePlaylist } from "../controllers/playlist.controller.js";

import verifyToken from "../middleware/verifyToken.js";

const router = new Router();

router
.get("/:id", verifyToken, getPlaylist)
.get("/:id/songs", getPlaylistSongs)
.post("/create", verifyToken, createPlaylist)
.put("/:id/update", verifyToken, updatePlaylist)
// .put("/:id/add-song", )
// .put("/:id/remove-song", )
.delete("/:id", verifyToken, deletePlaylist);

export default router;