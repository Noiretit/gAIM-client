import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import axios from "axios";

import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class MyReviews extends Component {
  state = {
    allReviews: [], //All the reviews
    reviewsToShow: [], //Reviews of the user we need to show
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/review")
      .then((reviews) => {
        const allReviews = reviews.data;
        const thisUserId = this.props.user._id;
        console.log(allReviews);

        let thisUserReviews = allReviews.filter((eachReview) =>
          eachReview.user._id.includes(thisUserId)
        );

        this.setState({
          allReviews: reviews.data,
          reviewsToShow: thisUserReviews,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { reviewsToShow } = this.state;

    return (
      <div>
        {reviewsToShow.map((oneReview, index) => {
          const dateOfCreation = new Date(oneReview.createdAt);
          const year = dateOfCreation.getFullYear();
          const month = dateOfCreation.getMonth() + 1;
          const day = dateOfCreation.getDate();

          return (
            <div className="each-review-profile" key={index}>
              <img
                style={{ marginBottom: "1em" }}
                className="profile-pic-videogame-details"
                src={`https://avatars.dicebear.com/v2/${oneReview.user.gender}/${oneReview.user.username}.svg?options[padding]=0.4&options[background]=%2300ff99`}
                alt="profile-pic"
              />
              <div>
                <p>
                  On: {day}/{month}/{year}
                </p>
                <p>{oneReview.videogameName}</p>
                <p>{oneReview.review}</p>

                <Link to={`/videogames/${oneReview.videogameId}`}>
                  <Button
                    className="margin-buttons-marketplace"
                    variant="danger"
                  >
                    Details <small>about the game</small>
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth(MyReviews);
