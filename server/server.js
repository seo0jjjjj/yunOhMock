import express from "express";
import app from "./app.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import http from "http";
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();

console.log(process.env.CLIENT_URL);

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
});

// HTTP 서버 및 Socket.IO 설정
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ["https://localhost:3000", "https://localhost", "http://localhost", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO 통신
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message', (message) => {
    console.log(`Received message => ${message}`);
    socket.send('Hello! Message From Server!! '+ message);
  });
  
  socket.on('request_reload', (message) => {
    console.log(`reload request => ${message}`);
    socket.emit('reload','true');
  });

});

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});