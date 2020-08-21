import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/navbar/Navbar";

class SearchPage extends Component {
  render() {
    return (
      <div>
        <h1>VIDEO GAMES</h1>
        <p>Look for all the games you want</p>

        <Navbar />
    </div>
    )
  }
}


export default withAuth(SearchPage);
