import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import AddGame from "../components/addgames/AddGame";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class MarketplacePage extends Component {
  state = {
    offersToShow: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/offer")
      .then((allOffers) => {
        console.log(allOffers.data);
        this.setState({ offersToShow: allOffers.data });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const { offersToShow } = this.state;
    return (
      <div>
        <h1>MARKETPLACE</h1>
        <p>Sell your games</p>
        {offersToShow.map((offer) => {
          return (
            <div id="container-all-offers">
              <main id="all-offers">
                <Card key={offer._id}>
                  <Card.Img
                    variant="top"
                    src={offer.videoGamePic}
                    alt={offer.videoGameName}
                  />
                  <Card.Body>
                    <Card.Title>{offer.videoGameName}</Card.Title>
                    <p>{offer.childrenPlatform}</p>
                    <p>{offer.price}</p>
                    <Link to={`/videogames/${offer.videoGameId}`}>
                      <Button variant="danger">Sell this game</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </main>
            </div>
            /* <div className="offersToShow" key={offer._id}>
              <img
                className="img-games-marketplace"
                src={offer.videoGamePic}
                alt={offer.videoGameName}
              />
              <p>{offer.videoGameName}</p>
              <p>{offer.childrenPlatform}</p>
              <p>{offer.price}</p>

              <Link to={`/videogames/${offer.videoGameId}`}>Details</Link>
            </div> */
          );
        })}
        <AddGame />
      </div>
    );
  }
}
export default withAuth(MarketplacePage);
