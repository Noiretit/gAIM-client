import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class AddGamePage extends Component {
  state = {
    platform: "",
    price: "",
  };

  render() {
    const { platform, price } = this.state;
    return (
      <div>
        <p>Create an offer here</p>

        <form onSubmit={this.handleFormSubmit}>
          <label>Platform*</label>
          <div>
            <select
              name="children-platform"
              onChange={this.handleSelectedPlatform}
            >
              <option defaultValue>Gender:</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="bottts">Robot</option>
            </select>
          </div>

          <label>Price*</label>
          <div>
            <input
              type="text"
              name="price"
              value={price}
              onChange={this.handleChange}
            />
          </div>
        </form>

        <Link to={"/marketplace"}>Go back</Link>
      </div>
    );
  }
}

export default withAuth(AddGamePage);
