import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { withAuth } from "../lib/AuthProvider";

function Profile() {
  return (
    <div>
      <h1>VIDEO GAMES</h1>
      <p>Look for all the games you want</p>
      <Link to={"/"}>
        <button className="navbar-button">Back home</button>
      </Link>

      <Navbar />
    </div>
  );
}

export default withAuth(Profile);
