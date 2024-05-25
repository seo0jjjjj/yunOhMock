import express from "express";
import app from "./app.js";
import dotenv from 'dotenv'
import mongoose from "mongoose";


dotenv.config()

console.log(process.env.CLIENT_URL);

app.set('env','development');

app.get("/",(req,res,next)=> {
  res.send("hello world!");
})

const connect = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO);
    console.log("mongo db connected!");
  } catch (error) {
    console.log("mongoose connection error");
    throw error;
  }
};

// 연결 해제 이벤트핸들

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
})  


app.listen("8080",()=>{
  connect();
  console.log("app running");
})