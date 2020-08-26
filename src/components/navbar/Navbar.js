import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import "./Navbar.css";
import $ from "jquery";

class Navbar extends Component {
  componentDidMount() {
    /*Jquery*/
    $(function () {
      // this will get the full URL at the address bar
      var url = window.location.href;

      // passes on every "a" tag
      $(".links-navbar").each(function () {
        // checks if its the same on the address bar
        if (url === this.href) {
          $(this).addClass("changeMenuColor");
        }
      });
    });
  }

  render() {
    var prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("container-navbar").style.bottom = "0";
      } else {
        document.getElementById("container-navbar").style.bottom = "-78px";
      }
      prevScrollpos = currentScrollPos;
    };

    return (
      <nav id="container-navbar" className="container-navbar">
        <div>
          <Link className="links-navbar" to="/home">
            <img
              className="icons-navbar"
              src={"../../images/favicon-aim-navbar-grey.svg"}
              alt="navbar-icon"
            />
          </Link>
          <p>Home</p>
        </div>

        <div>
          <Link className="links-navbar" to="/videogames">
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
          <Link className="links-navbar" to="/marketplace">
            <img
              className="icons-navbar"
              src={"../../images/new-marketplace-greyish.svg"}
              alt="navbar-icon"
            />
          </Link>
          <p>Marketplace</p>
        </div>

        <div>
          <Link className="links-navbar" to="/myprofile">
            <img
              className="icons-navbar"
              src={"../../images/new-user-greyish.svg"}
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
