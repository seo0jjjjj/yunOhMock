import app from "./app.js";
import dotenv from 'dotenv';
import http from "http";
import { createFile, initalizeDatabase, initializeSocket } from "./utils/Initializer.js";


async function start(){

  // 0. 미들웨어 초기화
  console.log("✅ 0. Middleware initialized!");
  // 1. upload파일 생성
  createFile(); 
  // 2. MongoDB 연결
  await initalizeDatabase();
  console.log("✅ 2. mongo db connected!");

  // 3. HTTP 서버 및 Socket.IO 설정
  const server = http.createServer(app);
  const client = [];

  console.log('──────────────────────────────────────────────────────');

  server.listen(process.env.PORT, async () => {
    console.log('🚀 server running at ' + process.env.PORT);
    
    // Socket.IO 서버 초기화 
    initializeSocket(server, client );
    
    // setInterval(() => {
    //   console.log(`  📊 ${client.length} users connected`);
    // },10000);

  });
}

start();


 