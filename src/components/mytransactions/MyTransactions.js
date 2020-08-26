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
      .get(`${process.env.REACT_APP_API_URL}/api/offer`)
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
      .post(`${process.env.REACT_APP_API_URL}/api/offer/delete`, { id })
      .then(() => this.componentDidMount())
      .catch((err) => console.log("Error while removing comment", err));
  }

  render() {
    const { transactionsToShow } = this.state;
    return (
      <div>
        {transactionsToShow.map((oneTransaction, index) => {
          if (oneTransaction.childrenPlatform === "Linux") {
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PSP") {
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
                        src="../../images/playstation-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PS Vita") {
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
                        src="../../images/playstation-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PlayStation") {
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
                        src="../../images/playstation-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PlayStation 2") {
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
                        src="../../images/playstation-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PlayStation 3") {
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
                        src="../../images/playstation-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PlayStation 4") {
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
                        src="../../images/playstation-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PlayStation 5") {
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
                        src="../../images/playstation-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "PC") {
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
                        src="../../images/pc-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Xbox") {
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
                        src="../../images/xbox-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Xbox One") {
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
                        src="../../images/xbox-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Xbox Series X") {
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
                        src="../../images/xbox-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Xbox 360") {
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
                        src="../../images/xbox-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Nintendo Switch") {
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
                        src="../../images/nintendo-switch-platform.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Nintendo DS") {
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
                        src="../../images/nintendo-3ds-platform.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Nintendo DSi") {
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
                        src="../../images/nintendo-3ds-platform.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Wii U") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Wii") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "GameCube") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Nintendo 64") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Game Boy Advance") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Game Boy Color") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Game Boy") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "SNES") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "NES") {
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
                        src="../../images/nintendo-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "iOS") {
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
                        src="../../images/apple-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Classic Macintosh") {
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
                        src="../../images/apple-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "macOS") {
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
                        src="../../images/apple-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Apple II") {
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
                        src="../../images/apple-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Android") {
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
                        src="../../images/android-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari 7800") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari 5200") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari 2600") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari Flashback") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari 8-bit") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Jaguar") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari ST") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari Lynx") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Atari XEGS") {
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
                        src="../../images/atari-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Genesis") {
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
                        src="../../images/sega-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "SEGA Saturn") {
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
                        src="../../images/sega-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "SEGA CD") {
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
                        src="../../images/sega-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "SEGA 32X") {
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
                        src="../../images/sega-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "SEGA Master System") {
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
                        src="../../images/sega-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Dreamcast") {
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
                        src="../../images/sega-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
          } else if (oneTransaction.childrenPlatform === "Game Gear") {
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
                        src="../../images/sega-platform-white.svg"
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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
                  <Card key={oneTransaction._id}>
                    <Card.Img
                      variant="top"
                      src={oneTransaction.videoGamePic}
                      alt={oneTransaction.videoGameName}
                    />
                    <Card.Body>
                      <Card.Title>{oneTransaction.videoGameName}</Card.Title>

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

                      {this.props.user._id ===
                      oneTransaction.user._id ? null : (
                        <Button
                          className="margin-buttons-marketplace"
                          variant="secondary"
                          onClick={(e) =>
                            this.handleChangeStatus(
                              e,
                              oneTransaction._id,
                              oneTransaction.status
                            )
                          }
                        >
                          Buy it
                        </Button>
                      )}

                      {this.props.user._id === oneTransaction.user._id ? (
                        <img
                          onClick={(e) =>
                            this.removeTransaction(e, oneTransaction._id)
                          }
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
      </div>
    );
  }
}

export default withAuth(MyTransactions);
