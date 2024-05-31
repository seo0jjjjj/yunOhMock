import "./messageSpan.css";

function MessageSpan({ message }) {
  return (
    <div className={`message ${message?.isMine ? "reverse" : ""}`}>
      <img
        alt="profileImg"
        src={message?.profileImg || "profile_sample_01.png"}
      />
      <div className="message-content">
        <span className="message-sender">
          {message.username ?? "익명의 사용자"}
        </span>
        <span className="message-detail">{message.content}</span>
      </div>
      <span className="message-time">{message.time}</span>
    </div>
  );
}

export default MessageSpan;
