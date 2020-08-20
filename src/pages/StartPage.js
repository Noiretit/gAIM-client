import React from 'react'
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div>
        <img src="/images/logo-gAIM-negro-png.png" alt="logo"/>
        <h1>Home Page</h1>
        <p>Bienvenido en la Home</p>
        <Link to={"/login"}> Login</Link>
        <Link to={"/signup"}> Sign up</Link>
    </div>
  )
}

export default StartPage;