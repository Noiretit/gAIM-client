import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Rating from "../../components/rating/Rating";

import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

import "../../App.css";

class ShowVideogame extends Component {
  state = {
    review: "",
    thisGameReviewsArray: [],
    thisGameScreenshootsArray: [],
    expandButton: "Show less",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getOneVideogame();
    this.getVideogameReviews();
    this.getVideogameScreenshots();
  }

  getOneVideogame = () => {
    const { id } = this.props.match.params;
    axios
      .get(`https://api.rawg.io/api/games/${id}`)
      .then((gameObj) => {
        const oneGame = gameObj.data;
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
      .get(`${process.env.REACT_APP_API_URL}/api/review`)
      .then((response) => {
        const AllReviews = response.data;
        const thisGameReviews = AllReviews.filter((eachReview) =>
          eachReview.videogameId.includes(thisVideogameId)
        );
        this.setState({ thisGameReviewsArray: thisGameReviews });
      })
      .catch((err) =>
        console.log(
          "Error while gathering ALL reviews in FRONT, getVideogameRewviews at ShowVideogame.js",
          err
        )
      );
  };

  getVideogameScreenshots = () => {
    const thisVideogameId = this.props.match.params.id;

    axios
      .get(`https://api.rawg.io/api/games/${thisVideogameId}/screenshots`)
      .then((response) => {
        const thisVGScreenshots = response.data.results;

        this.setState({ thisGameScreenshootsArray: thisVGScreenshots });
      })
      .catch((err) =>
        console.log("Error while getting VG screenshots, ShowVideogame.js", err)
      );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { review } = this.state;
    const videogameId = this.state.id;
    const videogameName = this.state.name;
    const user = this.props.user._id;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/review`,
        {
          review,
          videogameId,
          videogameName,
          user,
        },
        { withCredentials: true }
      ) //A añadir a cada llamada
      .then(() => {
        this.setState({ review: "" }, () => this.getVideogameReviews());
      })
      .catch((err) => console.log("Error while creating a review", err));
  };

  removeComment(e, reviewId) {
    const id = reviewId;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/review/delete`, { id })
      .then(() => this.getVideogameReviews())
      .catch((err) => console.log("Error while removing comment", err));
  }

  render() {
    const {
      background_image,
      name,
      parent_platforms,
      playtime,
      rating,
      description_raw,
      platforms,
      genres,
      stores,
      developers,
      released,
      review,
      thisGameReviewsArray,
      thisGameScreenshootsArray,
      id,
      expandButton,
    } = this.state;

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
                src="../../images/ios.svg"
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

    const allScreenshots = thisGameScreenshootsArray.map((screenshoot) => (
      <Carousel.Item key={screenshoot.id}>
        <img
          className="d-block w-100"
          src={screenshoot.image}
          alt="vg-screenshot"
        />
      </Carousel.Item>
    ));

    //Siempre hacer un ternario porque no siempre está listo para hacer un mapeo.
    const allDevelopers = developers
      ? developers.map((developer) => (
          <span key={developer.id}>{developer.name}</span>
        ))
      : null;

    const allGenres = genres
      ? genres.map((genre) => <span key={genre.id}>| {genre.name} </span>)
      : null;

    const allStores = stores
      ? stores.map((store) => (
          <p className="store-link" key={store.id}>
            <a href={store.url}>{store.store.name}</a>
          </p>
        ))
      : null;

    const allChildPlatforms = platforms
      ? platforms.map((platform) => (
          <span key={platform.id}>{platform.platform.name} |</span>
        ))
      : null;

    return (
      <div>
      {/* Videogame image */}
        <div id="test-img-vg">
          <img src={background_image} alt="vg-img" className="bg-img-cover" />
        </div>

        {/* Game info */}
        <main id="vg-detail-container">
          <section className="vg-title">{name}</section>
          <section>
            {parentPlatformsNames} | {playtime} hours
          </section>
          <section>
            <Rating>{rating}</Rating>
          </section>

          <section id="vg-detail-carousel">
            <Carousel>{allScreenshots}</Carousel>
          </section>
          <hr />

          {/* Description */}
          <h2>About</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle
              as={Button}
              value={expandButton}
              onClick={() =>
                expandButton === "Show less"
                  ? this.setState({ expandButton: "Show more" })
                  : this.setState({ expandButton: "Show less" })
              }
              className="acc-button"
              variant="outline-secondary"
              eventKey="0"
            >
              <p>{expandButton}</p>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <section className="description-vg-detail">
                {description_raw}
              </section>
            </Accordion.Collapse>
          </Accordion>
          <hr />

          {/* Game info */}
          <section>
            <div className="info-vg-detail-container">
              <div className="info-vg-detail">
                <p className="info-vg-detail-title">Platforms</p>
                <section className="info-vg-section-content">
                  | {allChildPlatforms}
                </section>
              </div>
              <div className="info-vg-detail">
                <p className="info-vg-detail-title">Genre</p>
                <section className="info-vg-section-content">
                  {allGenres} |
                </section>
              </div>
            </div>
            <div className="info-vg-detail-container">
              <div className="info-vg-detail" style={{ paddingTop: "1.5rem" }}>
                <p className="info-vg-detail-title">Developers</p>
                <section className="info-vg-section-content">
                  {allDevelopers}
                </section>
              </div>
              <div className="info-vg-detail" style={{ paddingTop: "1.5rem" }}>
                <p className="info-vg-detail-title">Release date</p>
                <section className="info-vg-section-content">
                  {released}
                </section>
              </div>
            </div>
          </section>
          <hr style={{ backgroundColor: "white" }} />

          {/* Online platforms */}
          <section>
            <h4>Buy this game online</h4>
            <div className="stores-container">{allStores}</div>

            <hr style={{ backgroundColor: "white" }} />
            
            {/* Access to marketplace */}
            <h4>Want to get rid of this game?</h4>
            <Link to={`/marketplace/add/${id}`}>
              <Button variant="danger">Sell it here</Button>
            </Link>
          </section>

          <hr style={{ backgroundColor: "white" }} />

          {/* Review form */}
          <section>
            <div className="review-title">
              <h4>Add a review</h4>
            </div>
            <form onSubmit={this.handleFormSubmit}>
              <div style={{ marginBottom: "0.5rem" }}>
                <textarea
                  className="text-area-vg-review"
                  type="text"
                  name="review"
                  value={review}
                  onChange={this.handleChange}
                ></textarea>
              </div>

              <div className="review-title">
                <Button type="submit" variant="danger">
                  Post your review
                </Button>
              </div>
            </form>

            <hr style={{ backgroundColor: "white" }} />
          </section>

          {/* VG reviews' list */}
          <section className="reviews-section">
            {thisGameReviewsArray.map((reviewObj) => {
              const dateOfCreation = new Date(reviewObj.createdAt);
              const year = dateOfCreation.getFullYear();
              const month = dateOfCreation.getMonth() + 1;
              const day = dateOfCreation.getDate();
              const hour = dateOfCreation.getHours();
              const minutes = dateOfCreation.getMinutes();

              return (
                <div className="review-container" key={reviewObj._id}>
                  <div className="profile-pic-container">
                    <img
                      style={{ marginBottom: "1em" }}
                      className="profile-pic-videogame-details"
                      src={`https://avatars.dicebear.com/v2/${reviewObj.user.gender}/${reviewObj.user.username}.svg?options[padding]=0.4&options[background]=%2300ff99`}
                      alt="profile-pic"
                    />
                    <p>{reviewObj.user.username}</p>
                  </div>
                  <div className="vg-detail-review-container">
                    <p>{reviewObj.review}</p>
                    <p>
                      {day}/{month}/{year}, at {hour}:{minutes}
                    </p>
                  </div>

                  {this.props.user._id === reviewObj.user._id ? (
                    <img
                      onClick={(e) => this.removeComment(e, reviewObj._id)}
                      id="close-icon"
                      className="close-icon"
                      src={"../../../images/close-icon-grey.svg"}
                      alt="close"
                    />
                  ) : null}
                </div>
              );
            })}
          </section>
        </main>
        <Navbar />
      </div>
    );
  }
}

export default withAuth(ShowVideogame);
