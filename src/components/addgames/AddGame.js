import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./AddGame.css";

class AddGame extends Component {
  render() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("container-add-game").style.bottom = "0";
        document.getElementById(
          "container-button-add-game"
        ).style.marginBottom = "0px";
      } else {
        document.getElementById("container-add-game").style.bottom = "-78px";
        document.getElementById(
          "container-button-add-game"
        ).style.marginBottom = "10px";
      }
      prevScrollpos = currentScrollPos;
    };

    return (
      <div>
        <img
          style={{ width: "100%" }}
          src="../../../images/android-platform-full.svg"
        />
        <img
          style={{ width: "100%" }}
          src="../../../images/android-platform-full.svg"
        />
        <div id="container-add-game">
          <div id="container-button-add-game">
            <Link className="link-add-game" to={"/"}>
              <img
                style={{ width: "30px" }}
                src={"../../images/plus-marketplace.svg"}
              />
              <p className="no-margin" style={{ color: "white" }}>
                Create an offer
              </p>
            </Link>
          </div>

          <nav id="" className="navbar-add-game">
            <div>
              <Link to="/home">
                <img
                  className="icons-navbar"
                  src={"../../images/favicon-aim-navbar.svg"}
                  alt="navbar-icon"
                />
              </Link>
              <p className="no-margin">Home</p>
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
              <p className="no-margin">Search</p>
            </div>

            <div>
              <Link to="/marketplace">
                <img
                  className="icons-navbar"
                  src={"../../images/new-marketplace-greyish.svg"}
                  alt="navbar-icon"
                />
              </Link>
              <p className="no-margin">Marketplace</p>
            </div>

            <div>
              <Link to="/myprofile">
                <img
                  className="icons-navbar"
                  src={"../../images/new-user-greyish.svg"}
                  alt="navbar-icon"
                />
              </Link>
              <p className="no-margin">Profile</p>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default withAuth(AddGame);
