import React from "react";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div style={{textAlign: "center", paddingTop: "6rem"}}>
      <img src="/images/logo-gAIM-blanco.svg" alt="logo" />
      <div style={{paddingTop: "5rem"}}>
        <h1>Home Page</h1>
        <p>Bienvenido en la Home</p>
        <Link to={"/login"}>
          <button className="navbar-button">Login</button>
        </Link>
        <Link to={"/signup"}>
          <button className="navbar-button">Sign up</button>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
