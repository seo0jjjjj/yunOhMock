import React, { useContext, useEffect, useState } from "react";
import "../style/home.css";
import { UserInfoContext } from "../context/UserInfoContext";
import { socket } from "../util/socketHandler";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { userInfo } = useContext(UserInfoContext);
  const [isMatching, setIsMatching] = useState(false);
  const [btnStartMatching, setBtnStartMatching] = useState("시작하기");
  const [matchingPlayerCount, setMatchingPlayerCount] = useState(0);
  const navigate = useNavigate();

  const handleMatchingStart = () => {
    //check user login
    if (userInfo === null) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!socket.connected) {
      alert("소켓이 연결되지 않았습니다.");
    }

    if (isMatching) {
      const isCancel = window.confirm(
        "매칭을 취소하시겠습니까?",
        "취소",
        "계속 매칭"
      );
      if (isCancel) {
        socket.emit("match-cancel", userInfo);
        setIsMatching(false);
        return;
      }
    }

    //alert("매칭을 시작합니다.")
    // 매칭 시작
    setIsMatching(true);
  };

  // on start Matching
  useEffect(() => {
    if (!isMatching) {
      setBtnStartMatching("시작하기");
      return;
    }
    socket.emit("match-start", userInfo);
    let dot = ".";

    const interval = setInterval(() => {
      if (isMatching) {
        // 매칭중 . > 매칭중 .. > 매칭중 ...
        setBtnStartMatching("매칭 중" + dot);
        dot += ".";

        if (dot.length > 3) {
          dot = ".";
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isMatching]);

  useEffect(() => {
    if (userInfo === null) {
      setIsMatching(false);
    }

    console.log("useEffect called from Home");

    socket.on("match-fail", (data) => {
      console.log("매치실패");
      alert("매칭이 실패했습니다. 다시 시도해주세요. 원인 :" + data?.message);
      setIsMatching(false);
    });

    socket.on("match-success", (data) => {
      navigate(`/game/${data.roomId}`);
    });

    return () => {
      socket.off("match-start");
      socket.off("match-fail");
      socket.off("match-success");
    };
  }, [socket, userInfo]);

  return (
    <>
      <div className="flex-container">
        <div className="panel">
          <div className="left-side-panel panel-item">
            <h1 className="title panel-item">
              친구와 함께 오목을 플레이해보세요.
            </h1>
            <h2 className="content panel-item">
              친구를 초대하고 실시간으로 구경할 수 있습니다.
            </h2>
            <div className="btn-container">
              <button onClick={handleMatchingStart} className="btn-start b">
                {btnStartMatching}
              </button>
              <button className="btn-watch b">구경하기</button>
              {/* {isMatching && (<p>현재 매칭중인 플레이어 수 : </p>)} */}
            </div>
          </div>
          <div className="right-side-panel">
            <img src="main-panel.png" className="main-img" alt="대충 이미지" />
          </div>
        </div>
      </div>
    </>
  );
}
