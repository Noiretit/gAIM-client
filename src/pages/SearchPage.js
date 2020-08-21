import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/searchbar/SearchBar";

import axios from "axios";

class Profile extends Component {
  state = {
    videoGames: [], //All the games
    videoGamesToShow: [], //What we will see with the search bar
  };

  componentDidMount() {
    let test = [];

    for (var i = 1; i < 10; i++) {
      axios.get("https://api.rawg.io/api/games?page=" + i).then((response) => {
        for (var i = 0; i < 20; i++) {
          test.push(response.data.results[i]);
        }
        this.setState({ videoGames: test, videoGamesToShow: test });
      });
    }
  }

  filterGames = (searchString) => {
    const lowerSearchString = searchString.toLowerCase();

    const gamesCopy = [...this.state.videoGames];
    const filteredGames = gamesCopy.filter((gameObj) => {
      const gameName = gameObj.name.toLowerCase();

      if (gameName.includes(lowerSearchString)) {
        return true;
      } else {
        return false;
      }
    });

    this.setState({ videoGamesToShow: filteredGames });
  };

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

        {/* SEARCH BAR */}
        <SearchBar filterGames={this.filterGames} />

        <main>
          {this.state.videoGamesToShow.map((gameObj, index) => {
            return (
              <div key={index}>
                <img
                  style={{ width: "100px", height: "150px" }}
                  src={gameObj.background_image}
                  alt={gameObj.name}
                />
                <p className="">{gameObj.name}</p>
              </div>
            );
          })}
        </main>

        {/* ALL GAMES
        <h2 id="titreAllGames">All Games</h2>
        <div className="container-all-games">{allGames}</div> */}

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Profile);
