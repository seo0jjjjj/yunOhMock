import { NavLink } from "react-router-dom"
import "./nav.css"
import React from 'react'


export default function Nav() {

  return (
    <>
    <div className="nav-container">
    <img alt="logo" src="logo.jpeg" className="logo"/>
    <NavLink to={""} className={"nav-item"} children={"home"}/>
    <NavLink to={""} className={"nav-item"} children={"categorie"}/>
    <div className="right">
    <NavLink to={""} className={"nav-item"} children={"Login"}/>
    <NavLink to={""} className={"nav-item"} children={"Register"}/>
    </div>  
    </div>

    </>
  )
}