import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import axios from "axios";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class MyTransactions extends Component {
  state = {
    allTransactions: [],
    transactions: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/offer")
      .then((allOffers) => {
        console.log(allOffers.data);
        this.setState({
          allTransactions: allOffers.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { allTransactions } = this.state;
    return (
      <div>
        {allTransactions.map((oneTransaction) => {
          return (
            <div className="container-all-offers">
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

                    {/* <Button
                        className="margin-buttons-marketplace"
                        variant="secondary"
                        onClick={(e) =>
                          this.handleChangeStatus(e, oneTransaction._id, oneTransaction.status)
                        }
                      >
                        Buy it
                      </Button> */}
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
