import React, { useContext, useEffect, useRef, useState } from 'react'
import "./chatApp.css"
import "boxicons"
import { socket } from '../../util/socketHandler';
import AsyncButton from '../asyncButton/AsyncButton';
import MessageSpan from '../messageSpan/MessageSpan';
import { UserInfoContext } from '../../context/UserInfoContext';

export default function ChatApp() {
  const {userInfo, isLoggedIn} = useContext(UserInfoContext);
  const [isChatAppOpen, setChatAppOpen] = useState(false);
  const [messages, setMessages] = useState();
  const inputRef = useRef();

  const ballonRef = useRef();

  // 플로팅버튼 클릭 이벤트
  const handleFloatingBtnClicked = () => {
    // 말풍선이 더 이상 보이지 않도록 수정
    ballonRef.current.style.opacity = 0;

    // 로그인 여부 확인


    // 로그인 안했을 시, 로그인 페이지


    // 로그인 했을 경우,


    // 채팅 소켓 연결




    setChatAppOpen(!isChatAppOpen);
  }


  // 채팅 전송
  const handlePost = () => {
    const message = inputRef.current.value;

    postMessage(message);

    inputRef.current.value = "";
  }

  const postMessage = (message) => {
    socket.emit("message", {
      message,
      username: userInfo?.nickname || "unknown",
      time: new Date().getTime
    })
  }


  useEffect(() => {
    // connect Socket and request Chat Server
    if (!socket.connected) {
      socket.connect();
      console.log("socket connected");
    }

    // join chat and


    // load Chats
    if (!messages) {
      console.log("request chats");
      socket.emit("request-chat-all-messages");
    }

    // response of get All chats
    socket.on("response-chat-all-message", (messages) => {
      console.log("response-chat-all-message : " + messages);

      setMessages(messages)
    })

    // 
    socket.on("new-message-append", (message) => {
      // setMessages
      console.log("new-message-append : " + message);

    })

    socket.on("new-user-connected", (message) => {
      // print new user arrived!
      console.log("new-user-connected : " + message);
    })

    // set Event hadle
    // 
  }, [])

  return (
    <>
      {/* 플로팅 버튼 */}
      <div className='floating-btn-container'>
        <div className='ballon' ref={ballonRef}>채팅에 참여하려면 여기를 클릭하세요.</div>
        <div className='chat-floating-btn' onClick={handleFloatingBtnClicked} draggable={'false'}>
          {isChatAppOpen ?
            (<box-icon name='comment-x' type='solid'></box-icon>)
            : (<box-icon name='message-dots' type='solid'></box-icon>)}
        </div>

      </div>
      {isChatAppOpen && (
        <div className='chat-app'>
          <div className='chat-content'>
            <span className='joined-message'></span>

            {
              <MessageSpan
              imgSrc = 'profile_sample_01.png'
              message='자바스크립트로 div 이동을 구현하려면 마우스 누른 상태에서 이동위치를 판단해서 div의 x,y 좌표를 바꿔주고... 코드가 많이 지저분해지는데 jQuery UI를 활용하면 한줄로 처리가 된다.'
              time={new Date().getTime()}
              sender='서윤오'
            />
            }

          </div>
          <div className='chat-input'>
            <input 
              placeholder='채팅을 입력하세요.'
              onKeyDown={e=>e.key === 'Enter' && handlePost()}
              ref={inputRef}
              />
            <div className='message-button'>
              <AsyncButton styleObj={{ borderRadius: "50%", padding: "10px", marginTop: "10px" }}>
                <i className='bx bx-send'></i>
              </AsyncButton>
            </div>
          </div>
        </div >)
      }
    </>
  )
}