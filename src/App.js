import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";

import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Home from "./pages/StartPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import MarketplacePage from "./pages/MarketplacePage";
import AddGamePage from "./pages/AddGamePage";
import EditUserPage from "./pages/EditUserPage";
import ShowVideogame from "./pages/showvideogame/ShowVideogame";
import SellThisGame from "./pages/SellThisGamePage";

import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      // On englobe les composants qui auront accès aux informations de AuthProvider tels que Login, signup, user, logout, isLoogedin.
      <AuthProvider>
        <div>
          <Switch>
            <AnonRoute exact path="/" component={Home} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />

            <PrivateRoute exact path="/home" component={HomePage} />

            <PrivateRoute exact path="/videogames" component={SearchPage} />
            <PrivateRoute exact path="/videogames/:id" component={ShowVideogame}/>

            <PrivateRoute exact path="/myprofile" component={UserPage} />
            <PrivateRoute exact path="/myprofile/edit" component={EditUserPage}/>

            <PrivateRoute exact path="/marketplace" component={MarketplacePage}/>
            <PrivateRoute exact path="/marketplace/add" component={AddGamePage}/>
            <PrivateRoute exact path="/marketplace/add/:id" component={SellThisGame}/>
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}
export default App;
