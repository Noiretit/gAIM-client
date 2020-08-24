import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

function StartPage() {
  return (
    <div style={{textAlign: "center", paddingTop: "6rem"}}>
      <img src="/images/logo-gAIM-blanco.svg" alt="logo" />
      <div style={{paddingTop: "3rem"}}>
        <h3>Your videogame<br/> tracking tool</h3>
        <hr/>
        <hr/>
        <div>
          <Link to={"/login"}>
            <button className="btn btn-danger start-btn">Login</button>
          </Link>
        </div>
        <hr/>
        <div>
          <Link to={"/signup"}>
            <button className="btn btn-danger start-btn">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
