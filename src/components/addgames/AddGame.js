import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./AddGame.css";

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("container-add-game").style.bottom = "0";
  } else {
    document.getElementById("container-add-game").style.bottom = "-78px";
  }
  prevScrollpos = currentScrollPos;
};

class AddGame extends Component {
  render() {
    return (
      <div id="container-add-game">
        <Link className="link-add-game" to={"/"}>
          <button className="add-game-marketplace">
            <img
              style={{ width: "30px" }}
              src={"../../images/plus-marketplace.svg"}
            />
            <p style={{ color: "white", margin: 0 }}>Create an offer</p>
          </button>
        </Link>
        <nav id="" className="navbar-add-game">
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
            <Link to="/videogames">
              <img
                id="searchIcon"
                className="icons-navbar"
                src={"../../images/new-search-greyish.svg"}
                alt="navbar-icon"
              />
            </Link>
            <p>Search</p>
          </div>

          <div>
            <Link to="/marketplace">
              <img
                className="icons-navbar"
                src={"../../images/new-marketplace-greyish.svg"}
                alt="navbar-icon"
              />
            </Link>
            <p>Marketplace</p>
          </div>

          <div>
            <Link to="/myprofile">
              <img
                className="icons-navbar"
                src={"../../images/new-user-greyish.svg"}
                alt="navbar-icon"
              />
            </Link>
            <p>Profile</p>
          </div>
        </nav>
      </div>
    );
  }
}

export default withAuth(AddGame);
