import express from "express";
import { login, loginViaGoogle, logout, register, session, checkUsernameDuplication } from "../controllers/auth.js";

const router = express.Router();
router.get("/session", session)

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/login-via-google", loginViaGoogle)
router.post("/username-duplication", checkUsernameDuplication)


export default router

