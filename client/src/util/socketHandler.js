import { io } from 'socket.io-client';

// 서버 IP와 포트를 명시적으로 설정
const SERVER_IP = 'localhost'; // 서버 IP 주소
const SERVER_PORT = '8080';        // 서버 포트 번호

const URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const socket = io(URL, {
  autoConnect: false
});