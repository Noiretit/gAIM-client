import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/searchbar/SearchBar";

import axios from "axios";

class Profile extends Component {
  state = {
    videoGames: [], //All the games
    videoGamesToShow: [], //What we will see with the search bar
    year: "",
    genre: "",
    platform: "",
  };

  componentDidMount() {
    let test = [];
    console.log(this.state)

    for (var i = 1; i < 10; i++) {
      axios.get("https://api.rawg.io/api/games?page=" + i).then((response) => {
        for (var i = 0; i < 20; i++) {
          test.push(response.data.results[i]);
        }
        this.setState({ videoGames: test, videoGamesToShow: test });
      });
    }
  }

  componentDidUpdate() {
    console.log(this.state)
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

  // handleChange = (event) => {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value }), this.filterPerGenrePlatformYear();
  // };

  handleSelectedYear = (event) => {
    this.setState({ year: event.target.value }, () => {
      this.filterGamesPerYear();
    });
  };

  filterGamesPerYear() {
    const { year } = this.state;

    axios
      .get(
        `https://api.rawg.io/api/games?dates=${year}-01-01,${year}-12-31&ordering=-rating`
      )
      .then((topSelectedYearResponse) => {
        const dataResults = topSelectedYearResponse.data.results;
        console.log(dataResults);

        this.setState({ ...this.state, videoGamesToShow: dataResults });
      });
  }

  handleSelectedPlatform = (event) => {
    this.setState({ platform: event.target.value }, () => {
      this.filterGamesPerPlatform();
    });
  };

  filterGamesPerPlatform = (event) => {
    const { platform } = this.state;

    axios
      .get(
        `https://api.rawg.io/api/games?parent_platforms=${platform}&ordering=-rating`
      )
      .then((topSelectedGamePerPlatform) => {
        const dataresults = topSelectedGamePerPlatform.data.results;

        this.setState({ ...this.state, videoGamesToShow: dataresults });
      });
  };

  handleSelectedGenre = (event) => {
    this.setState({ genre: event.target.value }, () => {
      this.filterGamesPerGenre();
    });
  };

  filterGamesPerGenre = (event) => {
    const { genre } = this.state;

    axios
      .get(`https://api.rawg.io/api/games?genres=${genre}&ordering=-rating`)
      .then((topSelectedGenreResponse) => {
        const dataResults = topSelectedGenreResponse.data.results;
        console.log(dataResults);

        this.setState({ ...this.state, videoGamesToShow: dataResults });
      });
  };

  render() {



    return (
      <div>
        <div className="logo-home">
          <img src="/images/Group.svg" alt="logo" />
        </div>

        <div className="header" id="myHeader">
          {/* SEARCH BAR */}
          <h2>Search</h2>
          <SearchBar filterGames={this.filterGames} />

          {/* FILTER BUTTONS */}
          <div style={{ display: "flex" }} className="searchButtons">
            <select
              className="platform-input"
              id="selectedPlatform"
              name="platform"
              onChange={this.handleChange}
            >
              <option defaultValue>Platform:</option>
              <option value="8">Android</option>
              <option value="5">Apple Macintosh</option>
              <option value="9">Atari</option>
              <option value="10">Commodore / Amiga</option>
              <option value="4">iOS</option>
              <option value="6">Linux</option>
              <option value="13">Neo Geo</option>
              <option value="7">Nintendo</option>
              <option value="4">PC</option>
              <option value="2">Playstation</option>
              <option value="11">SEGA</option>
              <option value="14">Web</option>
              <option value="3">Xbox</option>
              <option value="12">3DO</option>
            </select>
          </div>

          <div id="container-search-buttons">
            <div className="searchButtons year-input div-year-genre">
              <select
                className="year-and-genre"
                id="selectedYear"
                name="year"
                onChange={this.handleChange}
              >
                <option defaultValue>Year:</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
              </select>
            </div>

            <div className="searchButtons genre-input div-year-genre">
              <select
                className="year-and-genre"
                id="selectedGenre"
                name="genre"
                onChange={this.handleChange}
              >
                <option defaultValue>Genre:</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="arcade">Arcade</option>
                <option value="casual">Casual</option>
                <option value="family">Family</option>
                <option value="fighting">Fighting</option>
                <option value="indie">Indie</option>
                <option value="massively-multiplayer">
                  Massively Multiplayer
                </option>
                <option value="platformer">Platformer</option>
                <option value="puzzle">Puzzle</option>
                <option value="racing">Racing</option>
                <option value="role-playing-games-rpg">RPG</option>
                <option value="simulation">Simulation</option>
                <option value="sports">Sports</option>
                <option value="strategy">Strategy</option>
              </select>
            </div>
          </div>
        </div>


        {/* ALL GAMES */}
        <div id="all-cards">
          <main id="each-card">
            {this.state.videoGamesToShow.map((gameObj) => {
              return (
                <Card key={gameObj.id}>
                  <Card.Img variant="top" src={gameObj.background_image} alt={gameObj.name}/>
                  <Card.Body>
                  <Card.Title>{gameObj.name}</Card.Title>
                  <Card.Text>{gameObj.parent_platforms.map((gameObjPP, index) => {
                    if (gameObjPP.platform.name === "PlayStation") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/playstation-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "Xbox") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/xbox-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "PC") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/pc-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "Nintendo") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/nintendo-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (
                              gameObjPP.platform.name === "Apple Macintosh"
                            ) {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/apple-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "iOS") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon-ios"
                                  src="../../images/ios.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "Android") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/android-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "Linux") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/linux-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "Web") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/web-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "SEGA") {
                              return (
                                <img
                                  key={index}
                                  className="platform-icon"
                                  src="../../images/sega-platform-white.svg"
                                  alt="platform-icon"
                                />
                              );
                            } else if (gameObjPP.platform.name === "Atari") {
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
                                <p key={index}>- {gameObjPP.platform.name}</p>
                              );
                            }
                  })}</Card.Text>
                  <Link to={`/videogames/${gameObj.id}`}><Button variant="danger">See more</Button></Link>
                  </Card.Body>
              </Card>
              );
            })}
          </main>
        </div>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Profile);
