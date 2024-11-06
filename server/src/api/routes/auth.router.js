import { Router } from "express";
import { authorize, signIn, signUp } from "../controllers/auth.controller.js";

const router = Router();

router
.post("/sign-in", signIn)
.post("/sign-up", signUp)
.post("/authorize", authorize)

export default router;