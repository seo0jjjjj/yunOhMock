import express from "express";
import { login,loginViaGoogle,logout, register, session } from "../controllers/auth.js";

const router = express.Router();
router.get("/session", session)

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/login-via-google", loginViaGoogle)


export default router

