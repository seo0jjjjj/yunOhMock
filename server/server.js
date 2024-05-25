import express from "express";

const app = express();

app.get("/",(req,res,next)=> {
  res.send("hello world!");
})

app.listen("8080",()=>{
  console.log("app running");
})