// import React, { Component } from "react";
// import { withAuth } from "../lib/AuthProvider";
// import Navbar from "../components/navbar/Navbar";
// import Avatars from "@dicebear/avatars";
// import sprites from "@dicebear/avatars-identicon-sprites";
// import Spinner from 'react-bootstrap/Spinner'

// let options = {};
// let avatars = new Avatars(sprites);
// let svg = avatars.create("custom-seed");

// class Private extends Component {
//   state = { username: "", gender: "female" };

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSelectedGender = (event) => {
//     this.setState({ gender: event.target.value });
//   };

//   render() {
//     const { username, gender } = this.state;
//     const { logout } = this.props;
//     return (
//       <div>
//         <h1>Welcome {this.props.user.username}</h1>
//         <p>Your favorite genre is {this.props.user.genre}</p>

//         <Spinner animation="border" role="status">
//         <span className="sr-only">Loading...</span>
//         </Spinner>

//         <button className="navbar-button" onClick={logout}>
//           Logout
//         </button>

//         <div>
//           <select name="year" onChange={this.handleSelectedGender}>
//             <option>Gender:</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         <div>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={this.handleChange}
//           />
//         </div>

//         <div className="container mt-5 mb-5">
//           <div className="row">
//             <div className="col-md-3">
//               <div className="card">
//                 <img
//                   style={{ borderRadius: "50%" }}
//                   className="card-img-top"
//                   src={`https://avatars.dicebear.com/v2/${gender}/${username}.svg?options[padding]=0.4&options[background]=%2300ff99`}
//                 />
//                 <div className="card-body text-center">
//                   <h3 className="card-title">{username}</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Navbar />
//       </div>
//     );
//   }
// }

// export default withAuth(Private);
