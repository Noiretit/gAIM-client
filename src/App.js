import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";

import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Home from "./pages/StartPage";
import Private from "./pages/Private";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import MarketplacePage from "./pages/MarketplacePage";

import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import EditUserPage from "./pages/EditUserPage";


class App extends Component {
  render() {
    return (
      //On englobe les composants qui auront accès aux informations de AuthProvider tels que Login, signup, user, logout, isLoogedin.
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute exact path="/" component={Home} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            
            <PrivateRoute exact path="/private" component={Private} />
            <PrivateRoute exact path="/home" component={HomePage} />
            <PrivateRoute exact path="/myprofile" component={UserPage} />
            <PrivateRoute exact path="/myprofile/edit" component={EditUserPage} />
            <PrivateRoute exact path="/videogames" component={SearchPage} />
            <PrivateRoute exact path="/marketplace" component={MarketplacePage} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}
export default App;