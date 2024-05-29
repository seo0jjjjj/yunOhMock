import { NavLink } from "react-router-dom";
import "./nav.css";
import React from 'react';

export default function Nav() {

  return (
    <>
      <div className="nav-container">
        <img alt="logo" src="logo.png" className="logo" />
        {/* <NavLink to={"/"} className={"nav-item"}>YunOhMock</NavLink> */}
        <NavLink to={"/categories"} className={"nav-item"}>플레이하기</NavLink>
        <div className="right">
          <NavLink to={"/login"} className={"nav-item"}>로그인</NavLink>
          <NavLink to={"/register"} className={"nav-item box"}>회원가입</NavLink>
        </div>
      </div>

    </>
  );
}