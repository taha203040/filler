import { Router } from "express";

const authRouter = Router();
import { signIn, signUp, logout, getMe } from "../controllers/auth.controllers";
authRouter.post("/login", signIn);
authRouter.post("/register", signUp);
authRouter.post("/logout", logout);
authRouter.get("/me", getMe);
export default authRouter;
