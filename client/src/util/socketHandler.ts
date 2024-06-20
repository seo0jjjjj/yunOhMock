import { io } from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "__NO_.ENV_ENVIORMENT__";

export const socket = io(SERVER_URL, {
  autoConnect: false,
  withCredentials: true,
});
