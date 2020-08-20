import React from "react";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div>
      <img src="/images/logo-gAIM-negro-png.png" alt="logo" />
      <h1>Home Page</h1>
      <p>Bienvenido en la Home</p>
      <Link to={"/login"}>
        <button className="navbar-button">Login</button>
      </Link>
      <Link to={"/signup"}>
        <button className="navbar-button">Sign up</button>
      </Link>
    </div>
  );
}

export default StartPage;
