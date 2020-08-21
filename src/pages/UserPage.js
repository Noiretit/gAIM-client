import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <p>Bienvenido en tu profile</p>
      <Link to={"/"}>
        <button className="navbar-button">Back home</button>
      </Link>
      <Navbar />
    </div>
  );
}
export default Profile;