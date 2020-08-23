// import React, { Component } from 'react';
// import authService from '../../lib/auth-service';
// import userService from '../../lib/user-service';

// import {withAuth} from '../../lib/AuthProvider';

// import Navbar from '../../components/navbar/Navbar';

// import './ShowVideogame.css'

// import axios from 'axios';

// class ShowVideogame extends Component {
//     state = {
//     }

//     componentDidMount() {
//         this.getOneVideogame()
//     };

//     componentDidUpdate() {
//         // console.log(this.state)
//     }

//     getOneVideogame = () => {
//         const {id} = this.props.match.params;
//         axios
//         .get(`https://api.rawg.io/api/games/${id}`)
//         .then((gameObj) => {
//             const oneGame = gameObj.data;
//             // const oneGame = gameObj.data.platforms[0].platform.name;

//             // console.log(oneGame)
//             this.setState(oneGame);
//         })
//         .catch((err) => console.log('Error while getting one game, getOneVideogame at ShowVideogame.js', err))
//     };

//     // convertDate = (dateString) => {
//     //     var p = dateString.split(/\D/g)
//     //     return [p[2],p[1],p[0] ].join("-")
//     // }

    


//     render() {
//         //Arrays con objetos anidados con objetos inaccesibles:
//         //parent_platforms, platforms, genres, developers

//         //Para conseguir las imÃ¡genes y videos se debe usar el "slug" y hacer una
//         //llamada axios "api/games?search={slug}""
//         const {background_image, name, parent_platforms, playtime, rating, clip, slug, description_raw, platforms, genres, developers, released} = this.state
//         // console.log(this.state)
        
//         return (
//             <div>
//                 <div><img
//                  src={background_image}
//                  alt="vg-img"
//                  className="bg-img-cover"
//                  /></div>
//                  <section>
//                      {name}
//                  </section>
//                  {/* Div para screenshots */}
//                  <div></div>
//                  <hr/>
//                  <section>{description_raw}</section>
//                  <hr/>
//                  <section>
//                      <p>Platforms: Xbox Series X, PC, PlayStation 5, PlayStation 4, PlayStation 3, Xbox 360, Xbox One</p>
//                      <p>Genre: Action, Adventure</p>
//                      <p>Developers: Rockstar North</p>
//                      <p>Release date: {released}</p>
//                  </section>

//                  <Navbar />
//             </div>
//         )
//     }
// }

// export default withAuth(ShowVideogame)