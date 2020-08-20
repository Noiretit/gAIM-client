import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;

    return (
      <nav className="container-navbar">
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
          <Link to="/home">
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
