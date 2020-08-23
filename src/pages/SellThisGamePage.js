import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";

class ShowVideogame extends Component {
  state = {};

  componentDidMount() {
    this.getOneVideogame();
  }

  getOneVideogame = () => {
    const { id } = this.props.match.params;
    axios
      .get(`https://api.rawg.io/api/games/${id}`)
      .then((gameObj) => {
        const oneGame = gameObj.data;
        // const oneGame = gameObj.data.platforms[0].platform.name;

        console.log(oneGame);
        this.setState(oneGame);
      })
      .catch((err) =>
        console.log("Error while getting one game at SellThisGamePage.js", err)
      );
  };

  render() {
    const {
      background_image,
      name,
      parent_platforms,
      playtime,
      rating,
      clip,
      slug,
      description_raw,
      platforms,
      genres,
      developers,
      released,
    } = this.state;

    return (
      <div>
        <h3>You're going to sell {name}</h3>

        <img style={{ width: "100%" }} src={background_image} alt={name} />

        <label>Name:</label>
        <div>
          <input type="text" placeholder={name} value={name} disabled />
        </div>

        <label>Price:</label>
        <div>
          <input type="text" placeholder="25€" />
        </div>

        <Navbar />
      </div>
    );
  }
}

export default ShowVideogame;
