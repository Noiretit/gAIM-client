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

  //Show only the game status "Selling"
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/offer`)
      .then((allOffers) => {
        const offers = allOffers.data;

        let onlySellingGames = offers.filter((eachOffer) =>
          eachOffer.status.includes("selling")
        );

        this.setState({
          allOffers: onlySellingGames,
          offersToShow: onlySellingGames,
        });
      })
      .catch((err) => console.log(err));
  }

  filterGames = (searchString) => {
    const lowerSearchString = searchString.toLowerCase();

    const gamesCopy = [...this.state.allOffers];
    const filteredGames = gamesCopy.filter((gameObj) => {
      const gameName = gameObj.videoGameName.toLowerCase();

      if (gameName.includes(lowerSearchString)) {
        return true;
      } else {
        return false;
      }
    });

    this.setState({ offersToShow: filteredGames });
  };

  handleChangeStatus(e, videoGameId, videoGameStatus) {
    const id = videoGameId;
    let status = videoGameStatus;

    if (videoGameStatus === "selling") {
      status = "booked";
    }

    axios.post(`${process.env.REACT_APP_API_URL}/api/marketplace/status`, {
      id,
      status,
    });

    this.componentDidMount();
  }

  removeTransaction(e, transactionId) {
    const id = transactionId;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/offer/delete`, { id })
      .then(() => this.componentDidMount())
      .catch((err) => console.log("Error while removing comment", err));
  }

  render() {
    const { offersToShow } = this.state;

    return (
      <div
        style={{ textAlign: "center", marginTop: "1rem", marginBottom: "7rem" }}
      >
        <div className="logo-home">
          <img src="/images/Group.svg" alt="logo" />
        </div>
        <h1>Markeplace</h1>
        <p className="check-games-p">
          Check the games others users are selling
        </p>

        <div className="header">
          {/* SEARCH BAR */}
          <SearchBar filterGames={this.filterGames} />
        </div>

        <hr className="separation-hr" />

        {offersToShow.map((offer) => {
          if (offer.childrenPlatform === "Linux") {
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
                      <img
                        className="platform-icon"
                        src="../../images/linux-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>

                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PSP") {
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
                      <img
                        className="platform-icon"
                        src="../../images/playstation-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PS Vita") {
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
                      <img
                        className="platform-icon"
                        src="../../images/playstation-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PlayStation") {
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
                      <img
                        className="platform-icon"
                        src="../../images/playstation-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PlayStation 2") {
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
                      <img
                        className="platform-icon"
                        src="../../images/playstation-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PlayStation 3") {
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
                      <img
                        className="platform-icon"
                        src="../../images/playstation-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PlayStation 4") {
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
                      <img
                        className="platform-icon"
                        src="../../images/playstation-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PlayStation 5") {
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
                      <img
                        className="platform-icon"
                        src="../../images/playstation-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "PC") {
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
                      <img
                        className="platform-icon"
                        src="../../images/pc-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Xbox") {
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
                      <img
                        className="platform-icon"
                        src="../../images/xbox-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Xbox One") {
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
                      <img
                        className="platform-icon"
                        src="../../images/xbox-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Xbox Series X") {
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
                      <img
                        className="platform-icon"
                        src="../../images/xbox-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Xbox 360") {
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
                      <img
                        className="platform-icon"
                        src="../../images/xbox-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Nintendo Switch") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-switch-platform.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Nintendo DS") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-3ds-platform.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Nintendo DSi") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-3ds-platform.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Wii U") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Wii") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "GameCube") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Nintendo 64") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Game Boy Advance") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Game Boy Color") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Game Boy") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "SNES") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "NES") {
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
                      <img
                        className="platform-icon"
                        src="../../images/nintendo-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "iOS") {
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
                      <img
                        className="platform-icon"
                        src="../../images/apple-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Classic Macintosh") {
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
                      <img
                        className="platform-icon"
                        src="../../images/apple-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "macOS") {
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
                      <img
                        className="platform-icon"
                        src="../../images/apple-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Apple II") {
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
                      <img
                        className="platform-icon"
                        src="../../images/apple-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Android") {
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
                      <img
                        className="platform-icon"
                        src="../../images/android-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari 7800") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari 5200") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari 2600") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari Flashback") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari 8-bit") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Jaguar") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari ST") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari Lynx") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Atari XEGS") {
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
                      <img
                        className="platform-icon"
                        src="../../images/atari-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Genesis") {
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
                      <img
                        className="platform-icon"
                        src="../../images/sega-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "SEGA Saturn") {
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
                      <img
                        className="platform-icon"
                        src="../../images/sega-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "SEGA CD") {
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
                      <img
                        className="platform-icon"
                        src="../../images/sega-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "SEGA 32X") {
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
                      <img
                        className="platform-icon"
                        src="../../images/sega-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "SEGA Master System") {
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
                      <img
                        className="platform-icon"
                        src="../../images/sega-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Dreamcast") {
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
                      <img
                        className="platform-icon"
                        src="../../images/sega-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else if (offer.childrenPlatform === "Game Gear") {
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
                      <img
                        className="platform-icon"
                        src="../../images/sega-platform-white.svg"
                        alt="platform-icon"
                      />
                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          } else {
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

                      <p className="p-marketplace">
                        Platform: {offer.childrenPlatform} | Price:{" "}
                        {offer.price}€
                      </p>
                      <Link to={`/videogames/${offer.videoGameId}`}>
                        <Button
                          className="margin-buttons-marketplace"
                          variant="danger"
                        >
                          Details <small>about the game</small>
                        </Button>
                      </Link>

                      {this.props.user._id === offer.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(e, offer._id, offer.status)
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === offer.user._id ? (
                        <img
                          onClick={(e) => this.removeTransaction(e, offer._id)}
                          id="delete-icon"
                          className="delete-icon-marketplace"
                          src={"../../../images/delete-icon-red.svg"}
                          alt="close"
                        />
                      ) : null}
                    </Card.Body>
                  </Card>
                </main>
              </div>
            );
          }
        })}
        <AddGame />
      </div>
    );
  }
}
export default withAuth(MarketplacePage);
