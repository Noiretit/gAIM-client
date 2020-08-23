import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    genre: "",
    gender: "female",
    picture: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, genre, gender, picture } = this.state;
    console.log("Signup -> form submit", {
      username,
      email,
      password,
      genre,
      gender,
      picture,
    });
    this.props.signup({ username, email, password, genre, gender, picture });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSelectedGender = (event) => {
    this.setState({ gender: event.target.value });
  };

  render() {
    const { username, email, password, genre, gender, picture } = this.state;
    return (
      <div>
        <img src="/images/logo-gAIM-negro-png.png" alt="logo" />
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <select name="gender" onChange={this.handleSelectedGender}>
              <option defaultValue>Gender:</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="bottts">Robot</option>
            </select>
          </div>

          <label>Username*</label>
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </div>

          <label>Email*</label>
          <div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>

          <label>Password*</label>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <label>Favorite genre*</label>
          <div>
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={this.handleChange}
            />
          </div>

          <br />
          <div>
            <input type="submit" value="Signup" />
          </div>
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
