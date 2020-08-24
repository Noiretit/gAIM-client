import React, { Component } from "react";
import authService from "../../lib/auth-service";
import userService from "../../lib/user-service";
import { Link } from "react-router-dom";

import { withAuth } from "../../lib/AuthProvider";

import Navbar from "../../components/navbar/Navbar";

import "./ShowVideogame.css";

import axios from "axios";

class ShowVideogame extends Component {
  state = {
    review: "",
    thisGameReviewsArray: [],
  };

  componentDidMount() {
    this.getOneVideogame();
    this.getVideogameReviews();
  }

  componentDidUpdate() {
    console.log(this.state);
    // console.log(this.props)
    // console.log(this.props.user._id)
  }

  getOneVideogame = () => {
    const { id } = this.props.match.params;
    axios
      .get(`https://api.rawg.io/api/games/${id}`)
      .then((gameObj) => {
        const oneGame = gameObj.data;
        // const oneGame = gameObj.data.platforms[0].platform.name;

        // console.log(this.state);
        this.setState(oneGame);
      })
      .catch((err) =>
        console.log(
          "Error while getting one game, getOneVideogame at ShowVideogame.js",
          err
        )
      );
  };

  getVideogameReviews = () => {
    const thisVideogameId = this.props.match.params.id; //ID del videojuego

    axios
      .get(`http://localhost:4000/api/review`)
      .then((response) => {
        const AllReviews = response.data;
        const thisGameReviews = AllReviews.filter((eachReview) =>
          eachReview.videogameId.includes(thisVideogameId)
        );

        // console.log(thisGameReviews)

        this.setState({ thisGameReviewsArray: thisGameReviews });
      })
      .catch((err) =>
        console.log(
          "Error while gathering ALL reviews in FRONT, getVideogameRewviews at ShowVideogame.js",
          err
        )
      );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { review } = this.state;
    console.log(review);
    const videogameId = this.state.id;
    const user = this.props.user._id;

    axios
      .post("http://localhost:4000/api/review", { review, videogameId, user })
      .then(({ data }) => data)
      .catch((err) => console.log("Error while creating a review", err));
  };

  render() {
    //Arrays con objetos anidados con objetos inaccesibles:
    //parent_platforms, platforms, genres, developers

    //         //Para conseguir las imÃ¡genes y videos se debe usar el "slug" y hacer una
    //llamada axios "api/games?search={slug}""
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
      review,
      thisGameReviewsArray,
      id,
    } = this.state;

    const parentPlatformsNames = parent_platforms
      ? parent_platforms.map((platform, index) => {
          return <p key={index}>{platform.platform.name}</p>;
        })
      : null;

    return (
      <div>
        <div>
          <img src={background_image} alt="vg-img" className="bg-img-cover" />
        </div>
        <section>{name}</section>
        {/* Div para screenshots */}
        <div></div>
        <hr />
        <section>{description_raw}</section>
        <hr />
        <section>
          <span>Platforms: {parentPlatformsNames}</span>
          <p>Genre: Action, Adventure</p>
          <p>Developers: Rockstar North</p>
          <p>Release date: </p>
        </section>
        <section>
          <hr style={{ backgroundColor: "white" }} />
          <Link to={`/marketplace/add/${id}`}>Sell this</Link>
          <p>Add a review</p>
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label>Comment:</label>
              <textarea
                type="text"
                name="review"
                value={review}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div>
              <input type="submit" value="Create review" />
            </div>
          </form>
          <hr style={{ backgroundColor: "white" }} />
        </section>
        <section className="reviews-section">
          {thisGameReviewsArray.map((reviewObj) => {
            return (
              <div className="review-container" key={reviewObj._id}>
                <div className="profile-pic-container">
                  <img
                    style={{ marginBottom: "1em" }}
                    className="profile-pic-videogame-details"
                    src={`https://avatars.dicebear.com/v2/${reviewObj.user.gender}/${reviewObj.user.username}.svg?options[padding]=0.4&options[background]=%2300ff99`}
                    alt="profile-pic"
                  />
                </div>
                <div style={{ padding: "0 1rem" }}>
                  <p>{reviewObj.user.username} wrote:</p>
                  <p>{reviewObj.review}</p>
                </div>
              </div>
            );
          })}
        </section>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(ShowVideogame);
