import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    console.log("Login -> form submit", { email, password });
    this.props.login({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <img src="/images/logo-gAIM-negro-png.png" alt="logo"/>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <div>
            <input
              type="text"
              name="email"
              value={email}
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