import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Rating from '../../components/rating/Rating'

import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

import '../../App.css'

class ShowVideogame extends Component {
  state = {
    review: "",
    thisGameReviewsArray: [],
    thisGameScreenshootsArray: []
  };

  componentDidMount() {
    this.getOneVideogame();
    this.getVideogameReviews();
    this.getVideogameScreenshots();
  }

  componentDidUpdate() {
    console.log(this.state.thisGameScreenshootsArray);
    console.log(this.state.developers)
    console.log(this.state.genres)
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

  getVideogameScreenshots = () => {
    const thisVideogameId = this.props.match.params.id;

    axios
    .get(`https://api.rawg.io/api/games/${thisVideogameId}/screenshots`)
    .then((response) => {
      const thisVGScreenshots = response.data.results;

      this.setState({ thisGameScreenshootsArray: thisVGScreenshots})
    })
    .catch((err) => console.log('Error while getting VG screenshots, ShowVideogame.js', err))
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
         <img className="d-block w-100" src={screenshoot.image} alt="vg-screenshot" />
      </Carousel.Item>
    ));

    //Siempre hacer un ternario porque no siempre está listo para hacer un mapeo.
    const allDevelopers = developers ? (developers.map((developer) => <p>{developer.name}</p>)) : null;

    const allGenres = genres ? (genres.map(genre => <span>{genre.name} </span>)) : null;
    
    const allStores = stores ? (stores.map(store => <p className="store-link"><a href={store.url}>{store.store.name}</a></p>)) : null;
    

    return (
      <div>
        <div id="test-img-vg">
          <img src={background_image} alt="vg-img" className="bg-img-cover" />
        </div>

        <main id="vg-detail-container">
          <section className="vg-title">{name}</section>
          <section>{parentPlatformsNames} | {playtime} hours</section>
          <section><Rating>{rating}</Rating></section>
          
          <section id="vg-detail-carousel">
            <Carousel>{allScreenshots}</Carousel>
          </section>
          <hr />
          <h2>About</h2>
          <section>{description_raw}</section>
          <hr />
          <section>
            <div className="info-vg-detail-container" >
              <div className="info-vg-detail">
                <p className="info-vg-detail-title">Platforms</p>
                <p>{parentPlatformsNames}</p>
              </div>
              <div className="info-vg-detail">
                <p className="info-vg-detail-title">Genre</p>
                <p>{allGenres}</p>
              </div>
            </div>
            <div className="info-vg-detail-container" >
              <div className="info-vg-detail" style={{paddingTop: "1.5rem"}}>
                <p className="info-vg-detail-title">Developers</p>
                <p>{allDevelopers}</p>
              </div>
              <div className="info-vg-detail" style={{paddingTop: "1.5rem"}}>
                <p className="info-vg-detail-title">Release date</p>
                <p>{released}</p>
              </div>
            </div>
          </section>
          <hr style={{ backgroundColor: "white" }} />

          <section>
            <h4>Buy this game online</h4>
            <div className="stores-container">{allStores}</div>

            <h4>Or sell this game in our marketplace by clicking</h4>
            <Link to={`/marketplace/add/${id}`}><Button variant="danger">here</Button></Link>
          </section>

          <section>
            <hr style={{ backgroundColor: "white" }} />
            
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

    
              <Button type="submit" variant="danger">Post your review</Button>

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
        </main>
        <Navbar />
      </div>
    );
  }
}

export default withAuth(ShowVideogame);
