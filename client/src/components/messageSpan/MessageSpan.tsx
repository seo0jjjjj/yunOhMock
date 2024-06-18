import React, { useContext, useEffect, useState } from "react";
import "./messageSpan.css";
import { AuthContext } from "../../context/AuthContext";
import { MessageSpanProps } from "../../types";
import { formatTimeToAMPM } from "../../util/util";

function MessageSpan({ message, mySessionId} : MessageSpanProps):JSX.Element {
  const { sessionId, sender } = message;
  const { user } = useContext(AuthContext);
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    if (user) {
      setIsMine(user._id === message?.sender?._id);
      console.log(
        "cause1 :" + user._id + "===" + message?.sender?._id,
        isMine
      );
    }

    if (!isMine) {
      setIsMine(mySessionId === sessionId);
      console.log("cause2 :" + mySessionId + "===" + sessionId, isMine);
    }
  }, [user]);

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
      <span className="message-time">{typeof message.time}</span>
    </div>
  );
}

export default MessageSpan;
