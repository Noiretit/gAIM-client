import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

class SearchPage extends Component {
  render() {
    return (
      <div>
        <h1>VIDEO GAMES</h1>
        <p>Look for all the games you want</p>
        <Link to={"/"}>
          <button className="navbar-button">Back home</button>
        </Link>

        <Navbar />
    </div>
    )
  }
}


export default withAuth(SearchPage);


// import React, { Component } from "react";
// import { withAuth } from "../lib/AuthProvider";
// import Navbar from "../components/navbar/Navbar";

// class Private extends Component {
//   render() {
//     const { logout } = this.props;
//     return (
//       <div>
//         <h1>Welcome {this.props.user.username}</h1>
//         <p>Your favorite genre is {this.props.user.genre}</p>

//         <button className="navbar-button" onClick={logout}>
//           Logout
//         </button>

//         <Navbar />
//       </div>
//     );
//   }
// }

// export default withAuth(Private);
