import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Signup extends Component {
  state = { username: "", email: "", password: "", genre: "" };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, genre } = this.state;
    console.log("Signup -> form submit", { username, email, password, genre });
    this.props.signup({ username, email, password, genre });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, email, password, genre } = this.state;
    return (
      <div>
        <img src="/images/logo-gAIM-negro-png.png" alt="logo"/>        <h1>Sign Up</h1>
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
            <input 
            type="text" 
            name="genre" 
            value={genre}
            onChange={this.handleChange} />
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
};

export default withAuth(Signup);