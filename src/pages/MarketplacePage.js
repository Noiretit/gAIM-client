import React, { Component } from "react";
import Navbar from "../components/navbar/Navbar";
import { withAuth } from "../lib/AuthProvider";
import AddGame from "../components/addgames/AddGame";
import axios from "axios";

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
          return <p>{offer.price}</p>;
        })}

        <AddGame />
      </div>
    );
  }
}

export default withAuth(MarketplacePage);
