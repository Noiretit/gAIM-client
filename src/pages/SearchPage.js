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
    year: "",
    genre: "",
    platform: "",
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

        {/* SEARCH BAR */}
        <h2>Search:</h2>
        <SearchBar filterGames={this.filterGames} />

        {/* FILTER BUTTONS */}
        <div>
          <label for="selectedYear">Year:</label>
          <select
            id="selectedYear"
            name="year"
            onChange={this.handleSelectedYear}
          >
            <option selected>-</option>
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

          <label for="selectedPlatform">Platform: </label>
          <select
            id="selectedPlatform"
            name="platform"
            onChange={this.handleSelectedPlatform}
          >
            <option selected>-</option>
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

          <label form="selectedGenre">Genre: </label>
          <select
            id="selectedGenre"
            name="genre"
            onChange={this.handleSelectedGenre}
          >
            <option select>-</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="arcade">Arcade</option>
            <option value="casual">Casual</option>
            <option value="family">Family</option>
            <option value="fighting">Fighting</option>
            <option value="indie">Indie</option>
            <option value="massively-multiplayer">Massively Multiplayer</option>
            <option value="platformer">Platformer</option>
            <option value="puzzle">Puzzle</option>
            <option value="racing">Racing</option>
            <option value="role-playing-games-rpg">RPG</option>
            <option value="simulation">Simulation</option>
            <option value="sports">Sports</option>
            <option value="strategy">Strategy</option>
          </select>
        </div>

        {/* ALL GAMES */}
        <main className="container-all-games">
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

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Profile);
