import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";

class Test extends Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h1>Hola</h1>
        <Link to={"/private"}>Private</Link>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Test);
