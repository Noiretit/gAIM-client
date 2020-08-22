import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

import Navbar from "../components/navbar/Navbar";

// let allGametitle = document.getElementById("titreAllGames");
// console.log(allGametitle);

class Home extends Component {
  state = {
    lastReleased: [],
    topSelectedYear: [],
    topSelectedGenre: [],
    lastReleased: [],
    year: "2020",
    genre: "action",
  };

  componentDidMount() {
    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = todayDate.getMonth() + 1;
    const day = todayDate.getDate();
    const usableMonth = month < 10 ? `0${month}` : month;
    const usablePastMonth = month - 1 < 10 ? `0${month - 1}` : month;
    const usableDay = day < 10 ? `0${day}` : day;

    //Renderisa los last releases
    axios
      .get(
        `https://api.rawg.io/api/games?ordering=-released&platforms=18,1&dates=${year}-${usablePastMonth}-${usableDay},${year}-${usableMonth}-${usableDay}`
      )
      .then((lastReleasedResponse) => {
        const dataResults = lastReleasedResponse.data.results.slice(0, 10);

        this.setState({ ...this.state, lastReleased: dataResults });
      });

    axios
      .get(
        `https://api.rawg.io/api/games?dates=${year}-01-01,${year}-12-31&ordering=-rating&parent_platforms=1,2,3,7`
      )
      .then((topSelectedYearResponse) => {
        const dataResults = topSelectedYearResponse.data.results.slice(0, 10);

        this.setState({ ...this.state, topSelectedYear: dataResults });
      });

    axios
      .get(
        `https://api.rawg.io/api/games?dates=2010-01-01,2020-01-01&genres=${this.state.genre}&ordering=-rating&parent_platforms=1,2,3,7`
      )
      .then((topSelectedGenreResponse) => {
        console.log(topSelectedGenreResponse.data.results);

        const dataResults = topSelectedGenreResponse.data.results.slice(0, 10);

        this.setState({ ...this.state, topSelectedGenre: dataResults });
      });
  }

  filterGamesPerYear() {
    const { year } = this.state;

    axios
      .get(
        `https://api.rawg.io/api/games?dates=${year}-01-01,${year}-12-31&ordering=-rating&parent_platforms=1,2,3,7`
      )
      .then((topSelectedYearResponse) => {
        const dataResults = topSelectedYearResponse.data.results.slice(0, 10);

        this.setState({ ...this.state, topSelectedYear: dataResults });
      });
  }

  handleSelectedYear = (event) => {
    this.setState({ year: event.target.value }, () => {
      this.filterGamesPerYear();
    });
  };

  filterGamesPerGenre() {
    const { genre } = this.state;

    axios
      .get(
        `https://api.rawg.io/api/games?dates=2010-01-01,2020-01-01&genres=${genre}&ordering=-rating&parent_platforms=1,2,3,7`
      )
      .then((topSelectedGenreResponse) => {
        console.log(topSelectedGenreResponse.data.results);

        const dataResults = topSelectedGenreResponse.data.results.slice(0, 10);

        this.setState({ ...this.state, topSelectedGenre: dataResults });
      });
  }

  handleSelectedGenre = (event) => {
    this.setState({ genre: event.target.value }, () => {
      this.filterGamesPerGenre();
    });
  };

  render() {
    const {
      year,
      genre,
      topSelectedYear,
      topSelectedGenre,
      lastReleased,
    } = this.state;

    const lastReleasedGames = lastReleased.map((videoGame) => (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={videoGame.background_image}
          alt="bgimage"
        />
      </Carousel.Item>
    ));

    //Renderisar top 10 selected year
    const topGamesSelectedYear = topSelectedYear.map((videoGame) => (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={videoGame.background_image}
          alt="bgimage"
        />
      </Carousel.Item>
    ));

    //Renderisar top 10 selected genre
    const topGameSelectedGenre = topSelectedGenre.map((videoGame) => (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={videoGame.background_image}
          alt="bgimage"
        />
      </Carousel.Item>
    ));

    return (
      <div>
        <h1>Hola</h1>
        <Link to={"/private"}>Private</Link>

        {/* TOP SELECTED YEAR */}
        <h2>Top {year}</h2>
        <div>
          <select name="year" onChange={this.handleSelectedYear}>
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
        <Carousel>{topGamesSelectedYear}</Carousel>

        {/* TOP SELECTED GENRE */}
        <h2>Top {genre}</h2>
        <div>
          <select name="genre" onChange={this.handleSelectedGenre}>
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
        <Carousel>{topGameSelectedGenre}</Carousel>

        <h2>Last released</h2>
        <Carousel style={{ marginBottom: "2em" }}>{lastReleasedGames}</Carousel>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Home);
