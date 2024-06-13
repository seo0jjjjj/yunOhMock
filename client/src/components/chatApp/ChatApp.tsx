import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./chatApp.css";
import { socket } from "../../util/socketHandler";
import AsyncButton from "../asyncButton/AsyncButton";
import MessageSpan from "../messageSpan/MessageSpan";
import 'boxicons'
import { UserInfoContext } from "../../context/AuthContext";

interface Message {
  sender: string;
  content: string;
  time: number;
}

export default function ChatApp() : Element {
  const { userInfo, isLoggedIn } = useContext(UserInfoContext);
  const [isChatAppOpen, setChatAppOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>();
  const messageEndRef = useRef<HTMLDivElement>();
  const [sessionId, setSessionId] = useState();

  const ballonRef = useRef<HTMLDivElement>();

  useEffect((): void=> {
    if (messages?.length > 0) {
      messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 플로팅버튼 클릭 이벤트
  const handleFloatingBtnClicked = () => {
    // 말풍선이 더 이상 보이지 않도록 수정
    ballonRef.current.style.opacity = 0;

    setChatAppOpen(!isChatAppOpen);
  };

  // 채팅 전송
  const handlePost = () => {
    const value = inputRef.current.value;

    // 채팅이 비어있는지 확인
    if (/^\s*$/.test(value)) {
      alert("채팅을 입력해주세요.");
      return;
    }
    postMessage(value);

    inputRef.current.value = "";
  };

  const postMessage = (value) => {
    const message = {
      sender: userInfo,
      content: value,
      time: new Date().getTime,
    };

    socket.emit("chat-to-server", message);

    console.log("send message: " + message.content);
  };

  const onSocketConnected = () => {
    console.log("✅ socket Connected");
    socket.emit("request-all-chats");
  };

  const startSocketConnection = useCallback(() => {
    console.log("🔁 try to connect socket");
    // connect Socket and request Chat Server\
    const interval = setInterval(() => {
      socket.connect();
      console.log(
        ` ${!socket.connected ? "socket connect request failed" : "socket connect request success"}`
      );
      if (socket.connected) {
        clearInterval(interval);
        console.log("✅ connection interval cleared");
        onSocketConnected();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    // join chat and
    if (!socket.connected) {
      startSocketConnection();
    }
    // load Chats

    socket.on("handshake", (data) => {
      console.log(`  🏡 session-id: ${data.sessionId}`);
      setSessionId(data.sessionId);
      console.log(data.message);
    });

    socket.on("response-all-chats", (messages) => {
      console.log("  📪 All chats loaded! [length]: " + messages?.length || 0);
      setMessages(messages);
    });

    socket.on("chat-from-server", (data) => {
      const message = data;

      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.removeAllListeners();
    };
    // set Event hadle
    //
  }, [sessionId, messages, startSocketConnection]);

  return (
    <>
      {/* 플로팅 버튼 */}
      <div className="floating-btn-container">
        <div className="ballon" ref={ballonRef}>
          채팅에 참여하려면 여기를 클릭하세요.
        </div>
        <div
          className="chat-floating-btn"
          onClick={handleFloatingBtnClicked}
          draggable={"false"}
        >
          {isChatAppOpen ? (
            <box-icon name="comment-x" type="solid"></box-icon>
          ) : (
            <box-icon name="message-dots" type="solid"></box-icon>
          )}
        </div>
      </div>
      {isChatAppOpen && (
        <div className="chat-app">
          <div className="chat-content">
            <span className="joined-message"></span>

            {messages.map((message, index) => (
              <MessageSpan key={index} message={message} mySessionId={sessionId} />
            ))}
            <div ref={messageEndRef}> </div>
          </div>
          <div className="chat-input">
            <input
              placeholder="채팅을 입력하세요."
              onKeyDown={(e) => e.key === "Enter" && handlePost()}
              ref={inputRef}
            />
            <div className="message-button">
              <AsyncButton
                styleObj={{
                  borderRadius: "50%",
                  padding: "10px",
                  marginTop: "10px",
                }}
                onClick={handlePost}
              >
                <i className="bx bx-send"></i>
              </AsyncButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
