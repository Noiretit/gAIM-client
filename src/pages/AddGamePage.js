import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
        <div className="logo-home">
          <img src="/images/Group.svg" alt="logo" />
        </div>
        <div className="header" >
          {/* SEARCH BAR */}
          <h5>Search for the game you want to sell:</h5>
          <SearchBar filterGames={this.filterGames} />
        </div>

        <hr className="separation-hr" />

        {/* ALL GAMES */}
        <div className="content">
          <main>
            {this.state.videoGamesToShow.map((gameObj) => {
              return (
                <div className="container-all-offers">
                  <main className="all-offers">
                    <Card key={gameObj.id}>
                      <Link to={`/videogames/${gameObj.id}`}>
                        <Card.Img
                          variant="top"
                          src={gameObj.background_image}
                          alt={gameObj.name}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title>{gameObj.name}</Card.Title>
                        <p>
                          {gameObj.parent_platforms.map((oneGame, index) => {
                            if (oneGame.platform.name === "PlayStation") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/playstation-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "Xbox") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/xbox-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "PC") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/pc-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "Nintendo") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/nintendo-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (
                              oneGame.platform.name === "Apple Macintosh"
                            ) {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/apple-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "iOS") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/apple-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "Android") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/android-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "Linux") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/linux-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "Web") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/web-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "SEGA") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/sega-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (oneGame.platform.name === "Atari") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/atari-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else {
                              return (
                                <p key={index}>- {oneGame.platform.name}</p>
                              );
                            }
                          })}
                        </p>
                        <Link to={`/marketplace/add/${gameObj.id}`}>
                          <Button variant="danger">Sell this game</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </main>
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
