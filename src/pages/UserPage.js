import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import MyTransactions from "../components/mytransactions/MyTransactions";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";

import Card from "react-bootstrap/Card";
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
    console.log(this.state);
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

  render() {
    //console.log(this.state)
    const { logout } = this.props;
    const { username, email, genre, gender } = this.state;
    console.log(this.props.history);

    return (
      <div className="container-my-profile">
        <img
          style={{ marginBottom: "1em" }}
          className="profile-pic"
          src={`https://avatars.dicebear.com/v2/${gender}/${username}.svg?options[padding]=0.4&options[background]=%2300ff99`}
          alt="profile-pic"
        ></img>

        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Favorite genre: {genre}</p>
        <p>Gender: {gender}</p>
        <Link to={"/myprofile/edit"}>
          <button className="navbar-button">Edit</button>
        </Link>

        <span className="separation-line"></span>

        <div id="buttons-my-profile">
          <button className="buttons-my-profile">My games</button>

          <button className="buttons-my-profile">My reviews</button>

          <button
            className="buttons-my-profile"
            onClick={this.displayTransactions}
          >
            My transacrions
          </button>
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

        <Navbar />
      </div>
    );
  }
}

export default withAuth(UserPage);
