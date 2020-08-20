import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Signup extends Component {
  state = { username: "", password: "", genre: "" };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    console.log("Signup -> form submit", { username, password });
    this.props.signup({ username, password });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <img src="/images/logo-gAIM-negro.svg" alt="logo"/>
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
            <input type="genre" name="genre" onChange={this.handleChange} />
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