  import {app} from "./app.js";
import dotenv from 'dotenv';
import http from "http";
import { createFile, initalizeDatabase, initializeSocket } from "./utils/Initializer.js";
import { addMessageHandler } from "./utils/socketHandler.js";


async function start(){
  try {

  // 0. 미들웨어 초기화
  console.log("✅ 0. Middleware initialized!");
  // 1. upload파일 생성
  createFile(); 
  // 2. MongoDB 연결
  await initalizeDatabase();
  console.log("✅ 2. mongo db connected!");

  // 3. HTTP 서버 및 Socket.IO 설정
  const server = http.createServer(app);
  const clients = [];

  console.log('──────────────────────────────────────────────────────');

    server.listen(process.env.PORT, async () => {
      console.log('🚀 server running at ' + process.env.PORT);
    
      // Socket.IO 서버 초기화 
      const io = initializeSocket(server, clients);
      

      io.on('connection', (socket) => {
        clients.push(socket);
      
        console.log(`  🤝 A user connected => ${socket.id.slice(0,5)} (${clients.length} user Connected)` + socket.request.session.id);
        
        socket.emit("handshake", {
          sessionId: socket.request.session.id,
          message: '  🤝 socked connect from server'
        });

        addMessageHandler(socket, clients,io);
      
        
        socket.on('disconnect', () => {
          const index = clients.indexOf(socket);
          clients.splice(index, 1);
          console.log(`  🖐A user disconnected => ${socket.id.slice(0,5)} (${clients.length} user Connected)`);
        });
      });
        
      
    });
  } catch (err) {
    console.error('❌ Server initialization failed:', err);
  }

}

start();


 