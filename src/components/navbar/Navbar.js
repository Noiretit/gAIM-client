import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./Navbar.css";

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("container-navbar").style.bottom = "0";
  } else {
    document.getElementById("container-navbar").style.bottom = "-75px";
  }
  prevScrollpos = currentScrollPos;
};

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;

    return (
      <nav id="container-navbar" className="container-navbar">
        <div>
          <Link to="/home">
            <img
              className="icons-navbar"
              src={"../../images/favicon-aim-navbar.svg"}
              alt="navbar-icon"
            />
          </Link>
          <p>Home</p>
        </div>

        <div>
          <Link to="/home">
            <img
              className="icons-navbar"
              src={"../../images/search-navbar.svg"}
              alt="navbar-icon"
            />
          </Link>
          <p>Search</p>
        </div>

        <div>
          <Link to="/home">
            <img
              className="icons-navbar"
              src={"../../images/marketplace-navbar.svg"}
              alt="navbar-icon"
            />
          </Link>
          <p>Marketplace</p>
        </div>

        <div>
          <Link to="/myprofile">
            <img
              className="icons-navbar"
              src={"../../images/profile-navbar.svg"}
              alt="navbar-icon"
            />
          </Link>
          <p>Profile</p>
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
