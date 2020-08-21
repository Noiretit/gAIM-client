import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Home from "./pages/StartPage";
import Private from "./pages/Private";
import HomePage from "./pages/HomePage";
import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      //On englobe les composants qui auront accès aux informations de AuthProvider tels que Login, signup, user, logout, isLoogedin.
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute exact path="/" component={Home} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />

            <PrivateRoute path="/private" component={Private} />
            <PrivateRoute path="/home" component={HomePage} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}
export default App;
