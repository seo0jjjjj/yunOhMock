import { NavLink } from "react-router-dom";
import "./nav.css";
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../util/axiosService";

export default function Nav() {
  const {dispatch, isLoggedIn} = useContext(AuthContext);

  const handleLogout = () => {
    logout({
      onSuccess : (res) => {
        dispatch({type: "LOGOUT"})
        alert("로그아웃 되었습니다.");
      },
      onFailure : (err) => {
        console.log(err);
        alert(`로그아웃에 실패하였습니다. 다시 시도해주세요. \n ${err.response?.data?.message || "데이터 베이스 응답 오류"}`);
      }
    });
  }

  return (
    <>
      <div className="nav-container">
        <img alt="logo" src="logo.png" className="logo" />
        {/* <NavLink to={"/"} className={"nav-item"}>YunOhMock</NavLink> */}
        <NavLink to={"/categories"} className={"nav-item"}>플레이하기</NavLink>
        <div className="right">
        {isLoggedIn ?
          <button className={"nav-item box"} onClick={handleLogout}>로그아웃</button>
         :(<>
          <NavLink to={"/login"} className={"nav-item"}>로그인</NavLink>
          <NavLink to={"/register"} className={"nav-item box"}>회원가입</NavLink>
          </>
        )}
        </div>
      </div>

    </>
  );
}