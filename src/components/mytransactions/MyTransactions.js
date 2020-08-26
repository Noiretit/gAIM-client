import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import axios from "axios";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./MyTransactions.css";

class MyTransactions extends Component {
  state = {
    allTransactions: [], //All transactions
    transactionsToShow: [], //Transactions of the user we need to show
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/offer")
      .then((transactions) => {
        const allTransac = transactions.data;
        const thisUserId = this.props.user._id;

        let thisUserTransac = allTransac.filter((eachTransac) =>
          eachTransac.user._id.includes(thisUserId)
        );
        this.setState({
          allTransactions: transactions.data,
          transactionsToShow: thisUserTransac,
        });
      })
      .catch((err) => console.log(err));
  }

  removeTransaction(e, transactionId) {
    const id = transactionId;

    axios
      .post("http://localhost:4000/api/offer/delete", { id })
      .then(() => this.componentDidMount())
      .catch((err) => console.log("Error while removing comment", err));
  }

  render() {
    const { transactionsToShow } = this.state;
    return (
      <div>
        {transactionsToShow.map((oneTransaction, index) => {
          return (
            <div key={index} className="container-all-offers">
              <main className="all-offers">
                <Card key={oneTransaction._id}>
                  <Card.Img
                    variant="top"
                    src={oneTransaction.videoGamePic}
                    alt={oneTransaction.videoGameName}
                  />
                  <Card.Body>
                    <Card.Title>{oneTransaction.videoGameName}</Card.Title>
                    <img
                      className="platform-icon"
                      src="../../images/linux-platform-white.svg"
                      alt="platform-icon"
                    />
                    <p>Platform: {oneTransaction.childrenPlatform} </p>

                    <p>{oneTransaction.price} €</p>

                    <Link to={`/videogames/${oneTransaction.videoGameId}`}>
                      <Button
                        className="margin-buttons-marketplace"
                        variant="danger"
                      >
                        Details <small>about the game</small>
                      </Button>
                    </Link>

                    <img
                      onClick={(e) =>
                        this.removeTransaction(e, oneTransaction._id)
                      }
                      id="delete-icon"
                      className="delete-icon"
                      src={"../../../images/delete-icon-red.svg"}
                      alt="close"
                    />
                  </Card.Body>
                </Card>
              </main>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth(MyTransactions);
