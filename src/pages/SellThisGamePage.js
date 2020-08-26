import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
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
      .post(`${process.env.REACT_APP_API_URL}/api/offer`, {
        price,
        childrenPlatform,
        videoGameId,
        videoGameName,
        videoGamePic,
        user,
      })
      .then(() => this.props.history.push("/marketplace"))
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
    // eslint-disable-next-line no-unused-vars
    const childrenPlatformsNames = platforms
      ? platforms.map((oneChild) => {
          return childrenPlatforms.push(oneChild.platform.name);
        })
      : null;

    return (
      <div className="seller-container">
        <div className="logo-home">
          <img src="/images/Group.svg" alt="logo" />
        </div>
      
        <h3>Selling: {name}</h3>

        <form onSubmit={this.handleFormSubmit}>
          
          <img style={{ width: "100%" }} src={background_image} alt={name} />

          <hr className="separation-hr" style={{marginBottom: "1rem"}} />

          <div>Available on: {parentPlatformsNames}</div>

          <label className="label-selling-game">Name:</label>
          <div>
            <input
              type="text"
              name="name"
              placeholder={name}
              value={name}
              disabled
            />
          </div>

          <label className="label-selling-game">Price (in €):</label>
          <div>
            <input
              name="price"
              type="number"
              placeholder="25"
              value={price}
              onChange={this.handleChange}
            />
          </div>

          <label className="label-selling-game">Platforms: </label>
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
