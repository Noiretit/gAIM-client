import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Private extends Component {
  render() {
    const { logout } = this.props
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        <button className="navbar-button" onClick={logout}>
              Logout
        </button>
      </div>
      
    );
  }
}

export default withAuth(Private);
