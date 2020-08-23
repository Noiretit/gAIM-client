import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/searchbar/SearchBar";

import axios from "axios";

class AddGamePage extends Component {
  state = {
    videoGames: [], //All the games
    videoGamesToShow: [], //What we will see with the search bar
    year: "",
    genre: "",
    platform: "",
  };

  componentDidMount() {
    let test = [];

    for (var i = 1; i < 10; i++) {
      axios.get("https://api.rawg.io/api/games?page=" + i).then((response) => {
        for (var i = 0; i < 20; i++) {
          test.push(response.data.results[i]);
        }
        this.setState({ videoGames: test, videoGamesToShow: test });
      });
    }
  }

  filterGames = (searchString) => {
    const lowerSearchString = searchString.toLowerCase();

    const gamesCopy = [...this.state.videoGames];
    const filteredGames = gamesCopy.filter((gameObj) => {
      const gameName = gameObj.name.toLowerCase();

      if (gameName.includes(lowerSearchString)) {
        return true;
      } else {
        return false;
      }
    });

    this.setState({ videoGamesToShow: filteredGames });
  };

  handleSelectedPlatform = (event) => {
    this.setState({ platform: event.target.value }, () => {
      this.filterGamesPerPlatform();
    });
  };

  filterGamesPerPlatform = (event) => {
    const { platform } = this.state;

    axios
      .get(
        `https://api.rawg.io/api/games?parent_platforms=${platform}&ordering=-rating`
      )
      .then((topSelectedGamePerPlatform) => {
        const dataresults = topSelectedGamePerPlatform.data.results;

        this.setState({ ...this.state, videoGamesToShow: dataresults });
      });
  };

  render() {
    return (
      <div>
        <p>Create an offer here</p>

        <div className="header" id="myHeader">
          {/* SEARCH BAR */}
          <h2>Search:</h2>
          <SearchBar filterGames={this.filterGames} />

          {/* FILTER BUTTONS */}
          <div style={{ display: "flex" }} className="searchButtons">
            <select
              className="platform-input"
              id="selectedPlatform"
              name="platform"
              onChange={this.handleSelectedPlatform}
            >
              <option defaultValue>Platform:</option>
              <option value="8">Android</option>
              <option value="5">Apple Macintosh</option>
              <option value="9">Atari</option>
              <option value="10">Commodore / Amiga</option>
              <option value="4">iOS</option>
              <option value="6">Linux</option>
              <option value="13">Neo Geo</option>
              <option value="7">Nintendo</option>
              <option value="4">PC</option>
              <option value="2">Playstation</option>
              <option value="11">SEGA</option>
              <option value="14">Web</option>
              <option value="3">Xbox</option>
              <option value="12">3DO</option>
            </select>
          </div>
          <div id="container-search-buttons"></div>
        </div>

        {/* ALL GAMES */}
        <div className="content">
          <main>
            {this.state.videoGamesToShow.map((gameObj) => {
              return (
                <div className="container-all-games" key={gameObj.id}>
                  <img
                    style={{ width: "100%", height: "75%" }}
                    src={gameObj.background_image}
                    alt={gameObj.name}
                  />
                  <p>{gameObj.name}</p>
                  <Link to={`/videogames/${gameObj.id}`}>See more</Link>
                </div>
              );
            })}
          </main>
        </div>

        <Navbar />
      </div>
    );
  }
}

export default withAuth(AddGamePage);

// import React, { Component } from "react";
// import { withAuth } from "../lib/AuthProvider";
// import { Link } from "react-router-dom";
// import Navbar from "../components/navbar/Navbar";
// import SearchBar from "../components/searchbar/SearchBar";

// import axios from "axios";

// class AddGamePage extends Component {
//   state = {
//     name: "", //Name of the game they will click on
//     videoGames: [], //All the game
//     videoGamesToShow: [],
//     platform: "",
//     price: "",
//   };

//   handleChange() {
//     let listGame = [];

//     for (var i = 1; i < 10; i++) {
//       axios.get("https://api.rawg.io/api/games?page=" + i).then((response) => {
//         for (var i = 0; i < 20; i++) {
//           listGame.push(response.data.results[i]);
//         }
//         this.setState({ videoGames: listGame });
//       });
//     }
//   }

//   filterGames = (searchString) => {
//     const lowerSearchString = searchString.toLowerCase();

//     const gamesCopy = [...this.state.videoGames];
//     const filteredGames = gamesCopy.filter((gameObj) => {
//       const gameName = gameObj.name.toLowerCase();

//       if (gameName.includes(lowerSearchString)) {
//         return true;
//       } else {
//         return false;
//       }
//     });

//     this.setState({ videoGamesToShow: filteredGames });
//   };

//   render() {
//     const { name, price } = this.state;

//     return (
//       <div>
//         <p>Create an offer here</p>

//         {/* SEARCH BAR */}
//         <h2>Search:</h2>
//         <SearchBar filterGames={this.filterGames} />

//         <form onSubmit={this.handleFormSubmit}>
//           <label for="name">Name*</label>
//           <div>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={name}
//               onChange={this.handleChange}
//               onChange={this.handleNameGame}
//             />
//           </div>
//           <div id="suggestions"></div>

//           <label>Price*</label>
//           <div>
//             <input
//               type="text"
//               name="price"
//               value={price}
//               onChange={this.handleChange}
//             />
//           </div>
//         </form>

//         <hr className="separation-line" />

//         {/* ALL GAMES */}
//         <div className="content">
//           <main>
//             {this.state.videoGamesToShow.map((gameObj) => {
//               return (
//                 <div className="container-all-games" key={gameObj.id}>
//                   <img
//                     style={{ width: "100%", height: "75%" }}
//                     src={gameObj.background_image}
//                     alt={gameObj.name}
//                   />
//                   <p>{gameObj.name}</p>
//                   <Link to={`/videogames/${gameObj.id}`}>See more</Link>
//                 </div>
//               );
//             })}
//           </main>
//         </div>

//         <Link to={"/marketplace"}>Go back</Link>

//         <Navbar />
//       </div>
//     );
//   }
// }

// export default withAuth(AddGamePage);
