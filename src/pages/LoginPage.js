import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import '../App.css'

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    //console.log("Login -> form submit", { email, password });
    this.props.login({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div style={{textAlign: "center", marginTop: "3rem"}}>
        <img src="/images/logo-gAIM-blanco.svg" alt="logo" />
        <hr/>
        <h1>Login</h1>
        <hr/>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <div style={{marginBottom: "0.5rem"}}>
            <input
              type="text"
              name="email"
              value={email}
              className="login-signup-inputs"
              onChange={this.handleChange}
            />
          </div>
          <label>Password:</label>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              className="login-signup-inputs"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <input style={{marginTop: "0.5rem"}} className="btn btn-danger start-btn" type="submit" value="Login" />
          <hr/>
          <p>
            Don't have an account yet? <Link to={"/signup"}>Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);