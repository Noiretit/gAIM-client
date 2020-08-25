import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import AddGame from "../components/addgames/AddGame";
import SearchBar from "../components/searchbar/SearchBar";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class MarketplacePage extends Component {
  state = {
    allOffers: [], //All offers
    offersToShow: [], //What we will see with the search bar
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/offer")
      .then((allOffers) => {
        console.log(allOffers.data);
        this.setState({
          allOffers: allOffers.data,
          offersToShow: allOffers.data,
        });
      })
      .catch((err) => console.log(err));
  }

  filterGames = (searchString) => {
    const lowerSearchString = searchString.toLowerCase();

    const gamesCopy = [...this.state.allOffers];
    const filteredGames = gamesCopy.filter((gameObj) => {
      console.log(gameObj);
      const gameName = gameObj.videoGameName.toLowerCase();

      if (gameName.includes(lowerSearchString)) {
        return true;
      } else {
        return false;
      }
    });

    this.setState({ offersToShow: filteredGames });
  };

  render() {
    const { offersToShow } = this.state;
    return (
      <div>
        <h1>MARKETPLACE</h1>
        <p>Buy a game</p>

        <div className="header" id="myHeader">
          {/* SEARCH BAR */}
          <SearchBar filterGames={this.filterGames} />
        </div>

        {offersToShow.map((offer) => {
          return (
            <div className="container-all-offers">
              <main className="all-offers">
                <Card key={offer._id}>
                  <Card.Img
                    variant="top"
                    src={offer.videoGamePic}
                    alt={offer.videoGameName}
                  />
                  <Card.Body>
                    <Card.Title>{offer.videoGameName}</Card.Title>
                    <p>{offer.childrenPlatform}</p>
                    <p>{offer.price} €</p>
                    <Link to={`/videogames/${offer.videoGameId}`}>
                      <Button variant="danger">
                        Details <small>about the game</small>
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </main>
            </div>
          );
        })}
        <AddGame />
      </div>
    );
  }
}
export default withAuth(MarketplacePage);
