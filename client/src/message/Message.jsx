  import React, { useEffect, useState } from 'react';
  import {socket} from '../util/socketHandler'

  const ENDPOINT = "http://localhost:8080";

  function Message() {
    const [response, setResponse] = useState("");
    const [message, setMessage] = useState("");

    function connect() {
      if (!socket.connected) 
      socket.connect(); // 수동으로 연결을 시작
    }
  
    function disconnect() {
      if (socket.connected) 
      socket.disconnect(); // 수동으로 연결을 해제
    }

    useEffect(() => {
      // 서버로부터 메시지 수신
      socket.on("message", (data) => {
        setResponse(data);
      });

      socket.on("reload", (data)=> {
        window.location.reload();
      })

      return () =>{
        socket.off("message"); // 이벤트 리스너 정리
        disconnect();
      }
    }, [socket]);
    
    const sendMessage = () => {
      // 서버로 메시지 전송
      alert(socket.connected)
      socket.emit("message", message);
      setMessage("");
    };

    return (
      <div>
        <h1>React and Socket.IO Chat</h1>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>
        <div>
          <h2>Messages</h2>
          <p>{response}</p>
        </div>
        <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
      <button onClick={(e)=>socket.emit('request_reload','please')}>request_reload</button>
    </>

      </div>
    );
  }

  export default Message;
