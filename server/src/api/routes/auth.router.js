import { Router } from "express";
import { authorize, signIn, signUp } from "../controllers/auth.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router
.post("/sign-in", signIn)
.post("/sign-up", signUp)
.post("/authorize", verifyToken, authorize)

export default router;