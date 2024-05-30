import { useEffect, useReducer } from "react";
import { socket } from "../util/socketHandler";

const INITAL_STATE = {
  socket: socket,
};

const SocketContext = createContext();

const SocketReducer = (state, action) =>{ 
switch (action.type) {
  case "CONNECT":
    return
    break;
  case "DISCONNECT":
    break;
  default:
    throw new Error(`Unhandled action type: ${action.type}`);
};

const SocketProvider = ({ children }) => {
  const [state, dispath] = useReducer(SocketReducer, INITAL_STATE);

  useEffect(() => {
    // connect Socket and request Chat Server
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [state]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}