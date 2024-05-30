import express from "express";
import { login,loginViaGoogle,logout, register } from "../controllers/auth.js";

const router = express.Router();
router.get("/s", (req,res,next)=>{
  if(!req.session.view) req.session.view = 1;
  else {
    req.session.view++;
  }
  try{
  console.log("request arrived");
  res.status(200).json(req.session);
}catch(err){
  next(err);  
}});

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/login-via-google", loginViaGoogle)


export default router

