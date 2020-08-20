import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    console.log("Login -> form submit", { username, password });
    this.props.login({ username, password });
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
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <label>Password:</label>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <input type="submit" value="Login" />
          <p>
            Don't have an account yet? <Link to={"/signup"}>Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);