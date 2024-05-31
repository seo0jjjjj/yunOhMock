import dotenv from 'dotenv';
import mongoose from "mongoose";
import { Server as SocketIOServer } from 'socket.io';
import fs from "fs";
import { sessionMiddleware, app} from '../app.js';

dotenv.config();

/**
 * 몽고 데이터베이스에 연결하는 함수 
 * @returns {Promise<mongoose.Connection>} 연결 성공 시, mongoose.Connection 객체 반환
 
 */
export async function initalizeDatabase() {
  const connect = async () => {
    try {
      const mongo = await mongoose.connect(process.env.MONGO);
    } catch (error) {
      console.log("❌ mongoose connection error");
      throw error;
   }
  };  

  // 연결 해제 이벤트핸들
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
  });

  await connect();
}

/**
 * Socket.IO 서버를 초기화하는 함수
 */
export function initializeSocket(server, clients){

  const io = new SocketIOServer(server, {
    cors: {
      origin: ["https://localhost:3000", "https://localhost", "http://localhost", "http://localhost:3000",process.env.CLIENT_URL],
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)
  });
  
  return io;
}
 

  /**
 * 이미지를 업로드할 업로드 폴더가 존재하지 않을 때, 생성하는 함수
 */

export async function createFile(){

  // uploads 폴더가 없으면 생성하기
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    console.log("✅ 1. uploads 폴더가 존재하지 않습니다. 생성합니다.");
    fs.mkdirSync(uploadDir);
  }else{
    console.log("✅ 1. uploads 폴더가 존재합니다.");
  }
}