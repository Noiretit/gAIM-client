import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/searchbar/SearchBar";

import axios from "axios";

class AddGamePage extends Component {
  state = {
    videoGames: [], //All the games
    videoGamesToShow: [], //What we will see with the search bar
    year: "",
    genre: "",
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
    return (
      <div>
        <p>Create an offer here</p>

        <div className="header" id="myHeader">
          {/* SEARCH BAR */}
          <h2>Search:</h2>
          <SearchBar filterGames={this.filterGames} />
        </div>

        {/* ALL GAMES */}
        <div className="content">
          <main>
            {this.state.videoGamesToShow.map((gameObj) => {
              return (
                <div className="container-all-games" key={gameObj.id}>
                  <img
                    style={{ width: "100%", height: "75%" }}
                    src={gameObj.background_image}
                    alt={gameObj.name}
                  />
                  <p>{gameObj.name}</p>

                  <Link to={`/marketplace/add/${gameObj.id}`}>
                    Sell this game
                  </Link>
                </div>
              );
            })}
          </main>
        </div>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(AddGamePage);
