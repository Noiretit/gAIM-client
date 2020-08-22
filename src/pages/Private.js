import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/navbar/Navbar";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-identicon-sprites";

let options = {};
let avatars = new Avatars(sprites);
let svg = avatars.create("custom-seed");

class Private extends Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        <p>Your favorite genre is {this.props.user.genre}</p>

        <button className="navbar-button" onClick={logout}>
          Logout
        </button>

        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://avatars.dicebear.com/v2/identicon/tediro.svg?options[padding]=0.4&options[background]=%2300ff99"
                />
                <div className="card-body text-center">
                  <h3 className="card-title">Tedir</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Private);
