import { Router } from "express";
import { createJanre, deleteJanre, getJanres } from "../controllers/janres.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = new Router();

router
.get("/", getJanres)
.post("/create", verifyToken, createJanre)
.delete("/:id", verifyToken, deleteJanre);

export default router;