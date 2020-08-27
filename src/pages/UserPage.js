import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import MyTransactions from "../components/mytransactions/MyTransactions";
import MyReviews from "../components/myreviews/MyReviews";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";

class UserPage extends Component {
  state = {
    favorites: null,
  };

  componentDidMount() {
    userService
      .getOne()
      .then((userObj) => {
        let arrFavGames = [];

        if (userObj.favoriteVideogames) {
          Promise.all(
            userObj.favoriteVideogames.map(async (oneGameId) => {
              let oneGameData = await axios.get(
                `https://api.rawg.io/api/games/${oneGameId}`
              );
              arrFavGames.push(oneGameData.data);
            })
          ).then((arr) => {
            this.setState({ ...userObj, favorites: arrFavGames });
          });
        }
      })
      .catch((err) =>
        console.log("Error while mounting component, UserPage.js", err)
      );
  }

  componentDidUpdate(prevState) {
    if (this.state !== prevState) {
      return true;
    }
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  displayTransactions() {
    const transactions = document.getElementById("transactions");
    if (transactions.style.display === "none") {
      transactions.style.display = "block";
    } else {
      transactions.style.display = "none";
    }
  }

  displayReviews() {
    const transactions = document.getElementById("reviews");
    if (transactions.style.display === "none") {
      transactions.style.display = "block";
    } else {
      transactions.style.display = "none";
    }
  }

  displayFavGames() {
    const favGames = document.getElementById("favGames");
    if (favGames.style.display === "none") {
      favGames.style.display = "block";
    } else {
      favGames.style.display = "none";
    }
  }

  render() {
    const { logout } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { username, email, genre, gender, favorites } = this.state;

    return (
      <div className="container-my-profile">
        <img
          style={{ marginBottom: "1em" }}
          className="profile-pic"
          src={`https://avatars.dicebear.com/v2/${gender}/${username}.svg?options[padding]=0.4&options[background]=%2300ff99`}
          alt="profile-pic"
        ></img>
        <p>
          <span>Username:</span> {username}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
        <p>
          <span>Favorite genre:</span> {genre}
        </p>
        <Link to={"/myprofile/edit"}>
          <Button variant="secondary">Edit your profile</Button>
        </Link>
        <span className="separation-line"></span>

        <div id="favorite-games"></div>

        <div id="buttons-my-profile">
          <Button
            variant="secondary"
            className="buttons-my-profile"
            onClick={this.displayFavGames}
          >
            My games
          </Button>

          <Button
            variant="secondary"
            className="buttons-my-profile"
            onClick={this.displayReviews}
          >
            My reviews
          </Button>
          <Button
            style={{ paddingRight: "10px" }}
            variant="secondary"
            className="buttons-my-profile"
            onClick={this.displayTransactions}
          >
            My offers
          </Button>
        </div>
        <button className="logout-link" onClick={logout}>
          <img
            className="logout-icon"
            src="../../images/logout-grey.svg"
            alt="Logout"
          />
        </button>

        <div id="favGames" style={{ display: "none" }}>
          {favorites
            ? favorites.map((oneFav, index) => (
                <div className="container-all-offers">
                  <main className="all-offers">
                    <Card
                      className="card-fav-profile"
                      key={index}
                      style={{ width: "18rem" }}
                    >
                      <Card.Img variant="top" src={oneFav.background_image} />
                      <Card.Body>
                        <Card.Title>{oneFav.name}</Card.Title>
                        <Link to={`/videogame/${oneFav.id}`}>
                          <Button
                            className="margin-buttons-marketplace"
                            variant="danger"
                          >
                            Details <small>about the game</small>
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </main>
                </div>
              ))
            : null}
        </div>

        <div id="transactions" style={{ display: "none" }}>
          <MyTransactions />
        </div>

        <div
          id="reviews"
          className="container-review-profile"
          style={{ display: "none" }}
        >
          <MyReviews />
        </div>

        <Navbar />
      </div>
    );
  }
}
export default withAuth(UserPage);
