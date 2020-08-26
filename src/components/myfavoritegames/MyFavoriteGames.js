import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import axios from "axios";
import "./MyFavoriteGames.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class MyFavoriteGames extends Component {
  state = {
    allGames: [], //All games
    GamesToShow: [], //games of the user we need to show
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/myprofile")
      .then((profile) => {
        console.log(profile.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return <div></div>;
  }
}

export default withAuth(MyFavoriteGames);
