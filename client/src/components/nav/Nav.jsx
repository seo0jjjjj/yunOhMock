import { NavLink } from "react-router-dom";
import "./nav.css";
import React from 'react';

export default function Nav() {

  return (
    <>
    <div className="nav-container">
    <img alt="logo" src="logo.jpeg" className="logo"/>
    <NavLink to={"/"} className={"nav-item"}>home</NavLink>
    <NavLink to={"/categories"} className={"nav-item"}>categorie</NavLink>
    <div className="right">
    <NavLink to={"/login"} className={"nav-item"}>Login</NavLink>
    <NavLink to={"/register"} className={"nav-item"}>Register</NavLink>
    </div>  
    </div>

    </>
  );
}