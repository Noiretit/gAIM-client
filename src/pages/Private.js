import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/navbar/Navbar";
import Carousel from "react-bootstrap/Carousel";

class Private extends Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        <p>Your favorite genre is {this.props.user.genre}</p>

        <button className="navbar-button" onClick={logout}>
          Logout
        </button>

        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../images/slider1.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../images/slider2.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../images/slider3.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(Private);
