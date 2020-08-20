import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/navbar/Navbar";

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

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Private);
