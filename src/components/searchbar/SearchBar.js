import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = {
    search: "",
  };

  handleChange = (e) => {
    const updatedText = e.target.value;
    this.setState({ search: updatedText });

    this.props.filterGames(updatedText);
  };

  render() {
    return (
      <input
        id="searchbar-search-page"
        type="text"
        name="search"
        placeholder="ex: Super Mario Bross 2"
        value={this.state.search}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchBar;
