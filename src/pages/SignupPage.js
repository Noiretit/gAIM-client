import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import '../App.css'

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    genre: "action",
    gender: "male",
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

  handleSelectedGenre = (event) => {
    this.setState({genre: event.target.value });
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <div style={{textAlign: "center", marginTop: "3rem", textAlignLast:"center"}}>
        <img src="/images/logo-gAIM-blanco.svg" alt="logo" />
        <h1 style={{marginTop: "1rem"}} >Sign Up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label className="signup-label">Gender:</label>
          <div>
            <select className="login-signup-inputs" style={{textAlignLast: "center"}} name="gender" onChange={this.handleSelectedGender}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="bottts">Robot</option>
            </select>
          </div>

          <label className="signup-label">Username*</label>
          <div>
            <input
              type="text"
              name="username"
              className="login-signup-inputs"
              value={username}
              onChange={this.handleChange}
            />
          </div>

          <label className="signup-label">Email*</label>
          <div>
            <input
              type="text"
              name="email"
              className="login-signup-inputs"
              value={email}
              onChange={this.handleChange}
            />
          </div>

          <label className="signup-label">Password*</label>
          <div>
            <input
              type="password"
              name="password"
              className="login-signup-inputs"
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <label className="signup-label">Favorite genre*</label>
          <div>
            <select className="login-signup-inputs" style={{textAlignLast: "center"}} name="genre" onChange={this.handleSelectedGenre}>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="arcade">Arcade</option>
            <option value="casual">Casual</option>
            <option value="family">Family</option>
            <option value="fighting">Fighting</option>
            <option value="indie">Indie</option>
            <option value="massively-multiplayer">Massively Multiplayer</option>
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
            <input className="btn btn-danger start-btn" style={{marginTop: "2rem"}} type="submit" value="Signup" />
          </div>
        </form>
        <p style={{marginTop: "0.5rem"}}>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
