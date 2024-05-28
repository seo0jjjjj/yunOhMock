import React, { useEffect, useRef, useState } from 'react'
import "./chatBox.css"
import "boxicons"
import { socket } from '../../util/socketHandler';

export default function ChatBox() {
  const [isChatBoxOpen, setChatBoxOpen] = useState(false);
  const [messages, setMessages] = useState();
  const handleFloatingBtnClicked = () => {
    setChatBoxOpen(!isChatBoxOpen);
  }

  const inputRef = useRef();

  const handlePost = () =>{
    const message = inputRef.current.value;
    console.log("chatCreated : " + message);
    postMessage(message);
 
    inputRef.current.value = "";
  }

  const postMessage = (message) =>{
    socket.emit("message",{
      message,
      username : "unknown"
    })
  }


  useEffect(()=>{
    // connect Socket and request Chat Server
    if(!socket.connected){
      socket.connect();
      console.log("socket connected");
    }

    // load Chats
    if(!messages){
      socket.emit("request-chat-all-messages");
    }

    // response of get All chats
    socket.on("response-chat-all-message", (messages) => {
      console.log("response-chat-all-message : "+ messages);

      setMessages(messages)
    }) 

    // 
    socket.on("new-message-append", (message) => {
      // setMessages
      console.log("new-message-append : "+message);

    }) 

    socket.on("new-user-connected", (message) => {
      // print new user arrived!
      console.log("new-user-connected : "+message);
    }) 

    // set Event hadle
    // 
  },[])

  return (
    <>
    
    <div className='chat-floating-btn' onClick={handleFloatingBtnClicked} draggable = {'false'}>
    {isChatBoxOpen ? 
    (<box-icon name='comment-x' type='solid'></box-icon>)
    : (<box-icon name='message-dots' type='solid'></box-icon>)}
      </div>
      {isChatBoxOpen &&(
      <div className='chat-container'>
        <div className='chat-title'>
         <span>{"채팅"}</span>
       </div>
       <div className='chat-content'> 
       {/* {<Chat/>} */}
       </div>
       <div className='chat-input'>
        <input ref={inputRef}/>
        <button onClick = {handlePost}
        children={
          <box-icon name='subdirectory-left'/>}/>
      </div>
    </div>)}
    </>
  )
}