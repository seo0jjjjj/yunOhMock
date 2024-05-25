import express from "express";

/**
 * 미들웨어 설정, 라우팅 설정하는 파일
 */
const app = express();

app.get("/",(req,res,next)=> {
  res.send("hello world!");
})
