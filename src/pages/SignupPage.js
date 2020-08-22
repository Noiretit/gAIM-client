import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
<<<<<<< HEAD
  state = { username: "", email: "", password: "", genre: "", picture: "" };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, genre, picture } = this.state;
    console.log("Signup -> form submit", {
      username,
      email,
      password,
      genre,
      picture,
    });
    this.props.signup({ username, email, password, genre, picture });
=======
  state = { 
    username: "", 
    email: "", 
    password: "", 
    genre: "" 
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, genre } = this.state;
    //console.log("Signup -> form submit", { username, email, password, genre });
    this.props.signup({ username, email, password, genre });
>>>>>>> 4b01078cf8b33564606f303f5e28285c16a1e128
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
<<<<<<< HEAD
    const { username, email, password, genre, picture } = this.state;
    return (
      <div>
        <img src="/images/logo-gAIM-negro-png.png" alt="logo" />{" "}
=======
    const { username, email, password, genre } = this.state;

    return (
      <div>
        <img src="/images/logo-gAIM-negro-png.png" alt="logo"/>        
>>>>>>> 4b01078cf8b33564606f303f5e28285c16a1e128
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
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
<<<<<<< HEAD
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={this.handleChange}
=======
            <input 
              type="text" 
              name="genre" 
              value={genre}
              onChange={this.handleChange} 
>>>>>>> 4b01078cf8b33564606f303f5e28285c16a1e128
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
