import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import MyTransactions from "../components/mytransactions/MyTransactions";
import MyReviews from "../components/myreviews/MyReviews";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import Button from "react-bootstrap/Button";

class UserPage extends Component {
  state = {};
  getUserInfo = () => {
    userService
      .getOne()
      .then((userObj) => {
        this.setState(userObj);
      })
      .catch((err) =>
        console.log("Error while mounting component, UserPage.js", err)
      );
  };

  componentDidMount() {
    this.getUserInfo();
  }

  componentDidUpdate(nextProps) {
    if (this.state === {}) {
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

  render() {
    const { logout } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { username, email, genre, gender } = this.state;

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

        <div id="buttons-my-profile">
          <Button variant="secondary" className="buttons-my-profile">
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
