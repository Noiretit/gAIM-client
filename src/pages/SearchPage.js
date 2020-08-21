import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class Profile extends Component {
  state = {
    videoGames: [],
  };

  componentDidMount() {
    let test = [];

    for (var i = 1; i < 2; i++) {
      axios.get("https://api.rawg.io/api/games?page=" + i).then((response) => {
        for (var i = 0; i < 20; i++) {
          test.push(response.data.results[i]);
        }
        this.setState({ ...this.state, videoGames: test });
      });
    }
    console.log(test);
  }

  render() {
    //Renderisar todos los juegos
    const allGames = this.state.videoGames.map((videoGame, index) => (
      <div className="each-game" key={index}>
        <div>
          <img
            className="image-games-homepage"
            src={videoGame.background_image}
            alt={videoGame.name}
          />
        </div>

        <div>
          <p>{videoGame.name}</p>
        </div>
      </div>
    ));
    return (
      <div>
        <h1>VIDEO GAMES</h1>
        <p>Look for all the games you want</p>
        <Link to={"/"}>
          <button className="navbar-button">Back home</button>
        </Link>

        {/* ALL GAMES */}
        <h2 id="titreAllGames">All Games</h2>
        <div className="container-all-games">{allGames}</div>
        <Navbar />

        <Navbar />
      </div>
    );
  }
}


export default withAuth(Profile);
