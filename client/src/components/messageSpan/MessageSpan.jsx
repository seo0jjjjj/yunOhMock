import "./messageSpan.css";

function MessageSpan({message, time, sender, imgSrc}) {
  const currentTime = new Date();
  const messageTime = new Date(time);
  const diffInMinutes = Math.floor((currentTime - messageTime) / 1000 / 60);
  const isReverse = sender === "나" ? "reverse" : "";

  return (
  <div className={`message ${"reverse"}`}>
    <img alt='profileImg' src= {imgSrc &&'profile_sample_01.png'}/>
    <div className='message-content'>
        <span className='message-sender'>{sender}</span>
        <span className='message-detail'>{message}</span>
    </div>
  <span className='message-time'>{diffInMinutes+"분 전"}</span>
</div>);
}

export default MessageSpan

