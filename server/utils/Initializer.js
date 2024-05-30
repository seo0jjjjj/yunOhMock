import dotenv from 'dotenv';
import mongoose from "mongoose";
import { Server as SocketIOServer } from 'socket.io';
import fs from "fs";
import { sessionMiddleware } from '../app';

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
export async function initializeSocket(server, clients){

  const io = new SocketIOServer(server, {
    cors: {
      origin: ["https://localhost:3000", "https://localhost", "http://localhost", "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
  io.use(sessionMiddleware(socket.request, {}, next));
  
  // 클라이언트 접속
  io.on('connection', (socket) => { 
    clients.push(socket);
    console.log(`  🤝 A user connected => ${socket.id.slice(0,5)} (${clients.length} user Connected)` + socket.request.session.id);

    socket.on('request_reload', (message) => {
      console.log(`reload request => ${message} ${socket.id.slice(0,5)}`);
      socket.emit('reload','true');
    });
  
    socket.on('message', (message) => {
      console.log(`  📩message => ${JSON.stringify(message,null,2)}`);
    });
  
    socket.on('disconnect', () => {
      const index = clients.indexOf(socket);
      clients.splice(index, 1);
      console.log(`  🖐A user disconnected => ${socket.id.slice(0,5)} (${clients.length} user Connected)`);
    });
  });
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