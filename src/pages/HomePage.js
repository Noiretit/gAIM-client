import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar/Navbar";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoGames: [],
    };
  }

  componentDidMount() {
    let test = [];
    //let oneDimTest = test.flat();

    for (var i = 1; i < 12; i++) {
      axios.get("https://api.rawg.io/api/games?page=" + i).then((response) => {
        for (var i = 0; i < 19; i++) {
          test.push(response.data.results[i]);
        }
        this.setState({ ...this.state, videoGames: test });
      });
    }
    //console.log(test);
  }

  render() {
    //const { logout } = this.props;
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
        <h1>Hola</h1>
        <Link to={"/private"}>Private</Link>

        <h1>All Games</h1>
        <div className="container-all-games">{allGames}</div>
        <Navbar />
      </div>
    );
  }
}

export default withAuth(HomePage);
