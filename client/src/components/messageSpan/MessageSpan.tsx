import { useCallback, useContext, useEffect, useState } from "react";
import "./messageSpan.css";
import { UserInfoContext } from "../../context/AuthContext";

function MessageSpan({ message, mySessionId }) {
  const { sessionId, sender } = message;
  const { userInfo } = useContext(UserInfoContext);
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsMine(userInfo._id === message?.sender?._id);
      console.log(
        "cause1 :" + userInfo._id + "===" + message?.sender?._id,
        isMine
      );
    }

    if (!isMine) {
      setIsMine(mySessionId === sessionId);
      console.log("cause2 :" + mySessionId + "===" + sessionId, isMine);
    }
  }, [userInfo]);

  console.log(JSON.stringify(message.sender));

  return (
    <div className={`message ${isMine ? "reverse" : ""}`}>
      <img
        alt="profileImg"
        src={
          message?.sender?.imgURL ||
          process.env.REACT_APP_SERVER_URL +
            "uploads/samples/profile_sample_01.png"
        }
      />
      <div className="message-content">
        <span className="message-sender">
          {sender?.nickname ?? "익명의 사용자"}
        </span>
        <span className="message-detail">{message.content}</span>
      </div>
      <span className="message-time">{message.time}</span>
    </div>
  );
}

export default MessageSpan;
