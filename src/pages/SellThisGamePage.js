import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";

class ShowVideogame extends Component {
  state = {
    childrenPlatform: "",
    name: "",
    price: "",
  };

  componentDidMount() {
    this.getOneVideogame();
  }
  componentDidUpdate() {
    console.log(this.state)
    console.log(this.props.user._id)
  }

  getOneVideogame = () => {
    const { id } = this.props.match.params;
    axios
      .get(`https://api.rawg.io/api/games/${id}`)
      .then((gameObj) => {
        const oneGame = gameObj.data;

        this.setState({
          childrenPlatform: gameObj.data.platforms[0].platform.name,
        });
        this.setState(oneGame);
      })
      .catch((err) =>
        console.log("Error while getting one game at SellThisGamePage.js", err)
      );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { price, childrenPlatform } = this.state;
    const videoGameId = this.state.id;
    const videoGameName = this.state.name;
    const videoGamePic = this.state.background_image;
    const user = this.props.user._id;
    

    axios
      .post("http://localhost:4000/api/offer", {
        price,
        childrenPlatform,
        videoGameId,
        videoGameName,
        videoGamePic,
        user,
      })
      .then(({ data }) => data)
      .catch((err) => console.log("Err while creating a new offer", err));
  };

  render() {
    const {
      background_image,
      name,
      parent_platforms,
      price,
      platforms,
    } = this.state;

    //Get the parent platforms' name
    const parentPlatformsNames = parent_platforms
      ? parent_platforms.map((platform, index) => {
          if (platform.platform.name === "PlayStation") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/playstation-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "Xbox") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/xbox-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "PC") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/pc-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "Nintendo") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/nintendo-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "Apple Macintosh") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/apple-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "iOS") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/apple-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "Android") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/android-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "Linux") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/linux-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "Web") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/web-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "SEGA") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/sega-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else if (platform.platform.name === "Atari") {
            return (
              <img
                key={index}
                className="platform-icon"
                src="../../images/atari-platform-white.svg"
                alt="platform-icon"
              />
            );
          } else {
            return <p key={index}>- {platform.platform.name}</p>;
          }
        })
      : null;

    //Get the children platforms' name
    const childrenPlatforms = [];
    // const childrenPlatformsNames = platforms
    //   ? platforms.map((oneChild) => {
    //       childrenPlatforms.push(oneChild.platform.name);
    //     })
    //   : null;

    return (
      <div>
        <Link to={"/marketplace/add"}>Back</Link>
        <h3>You're going to sell {name}</h3>

        <form onSubmit={this.handleFormSubmit}>
          <img style={{ width: "100%" }} src={background_image} alt={name} />
          <div>{parentPlatformsNames}</div>

          <label>Name:</label>
          <div>
            <input
              type="text"
              name="name"
              placeholder={name}
              value={name}
              disabled
            />
          </div>

          <label>Price:</label>
          <div>
            <input
              name="price"
              type="text"
              placeholder="25€"
              value={price}
              onChange={this.handleChange}
            />
          </div>

          <label>Platforms: </label>
          <div>
            <select
              className="login-signup-inputs"
              style={{ textAlignLast: "center" }}
              name="childrenPlatform"
              onChange={this.handleChange}
            >
              {childrenPlatforms.map((oneChildrenPlatform, index) => {
                return (
                  <option key={index} value={oneChildrenPlatform}>
                    {oneChildrenPlatform}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className="btn btn-danger start-btn"
            style={{ marginTop: "2rem" }}
            type="submit"
          >
            Sell it
          </button>
        </form>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(ShowVideogame);
