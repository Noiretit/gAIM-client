import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

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
    const { username, email, password, genre, gender, picture } = this.state;
    return (
      <div style={{textAlign: "center", marginTop: "3rem"}}>
        <img src="/images/logo-gAIM-blanco.svg" alt="logo" />
        <h1 style={{marginTop: "1rem"}} >Sign Up</h1>
        <hr/>
        <form onSubmit={this.handleFormSubmit}>
          <label>Gender:</label>
          <div>
            <select name="gender" onChange={this.handleSelectedGender}>
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
            <select name="genre" onChange={this.handleSelectedGenre}>
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
          <hr/>
          <div>
            <input style={{padding: "0 0.5rem"}} type="submit" value="Signup" />
          </div>
        </form>
        <hr/>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
