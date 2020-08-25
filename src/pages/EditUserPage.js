import React, { Component } from "react";
import userService from "../lib/user-service";
import { withRouter } from "react-router-dom";

import { withAuth } from "../lib/AuthProvider";

import Navbar from "../components/navbar/Navbar";

class EditUserPage extends Component {
  state = {
    username: "",
    email: "",
    genre: "",
    gender: "",
  };

  componentDidMount() {
    userService
      .getOne()
      .then((userObj) => {
        const { username, email, genre, gender } = userObj;
        this.setState({ username, email, genre, gender });
      })
      .catch((err) => console.log("Error EditUserPage.js, line 15"));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSelectedGenre = (event) => {
    this.setState({ genre: event.target.value });
  };

  handleSelectedGender = (event) => {
    this.setState({ gender: event.target.value });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, genre, gender } = this.state;
    const updatedUser = { username, email, genre, gender };

    userService
      .updateOne(updatedUser)
      .then(() => this.props.history.push("/myprofile"))
      .catch((err) => console.log(err));
  };

  render() {
    const { username, email, genre, gender } = this.state;
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h3>Edit your profile</h3>
        <img
          style={{ marginBottom: "1em" }}
          className="profile-pic"
          src={`https://avatars.dicebear.com/v2/${gender}/${username}.svg?options[padding]=0.4&options[background]=%2300ff99`}
          alt="profile-pic"
        ></img>
        <form style={{ marginBottom: "6em" }} onSubmit={this.handleFormSubmit}>
          <div>
            <label>Username:</label>
            <div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <label>Email address:</label>
            <div>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div>
            <label className="signup-label">Favorite genre: </label>

            <select
              className="login-signup-inputs margin-inputs-edit-profile"
              style={{ textAlignLast: "center" }}
              name="genre"
              onChange={this.handleSelectedGenre}
            >
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="arcade">Arcade</option>
              <option value="casual">Casual</option>
              <option value="family">Family</option>
              <option value="fighting">Fighting</option>
              <option value="indie">Indie</option>
              <option value="massively-multiplayer">
                Massively Multiplayer
              </option>
              <option value="platformer">Platformer</option>
              <option value="puzzle">Puzzle</option>
              <option value="racing">Racing</option>
              <option value="role-playing-games-rpg">RPG</option>
              <option value="simulation">Simulation</option>
              <option value="sports">Sports</option>
              <option value="strategy">Strategy</option>
            </select>
          </div>
          <div>
            <label className="signup-label">Gender:</label>

            <select
              className="login-signup-inputs margin-inputs-edit-profile"
              style={{ textAlignLast: "center" }}
              name="gender"
              onChange={this.handleSelectedGender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="bottts">Robot</option>
            </select>
          </div>

          <div style={{ marginTop: "1em" }}>
            <button className="btn btn-danger start-btn" type="submit">
              Save changes
            </button>
          </div>
        </form>
        <Navbar />
      </div>
    );
  }
}

export default withRouter(withAuth(EditUserPage));
