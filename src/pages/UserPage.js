import React, { Component } from 'react'
import Navbar from "../components/navbar/Navbar";
import {Link} from 'react-router-dom';
import { withAuth } from "../lib/AuthProvider";
import userService from '../lib/user-service'

class UserPage extends Component {
    state = {

    }
    getUserInfo = () => {
        userService.getOne()
        .then(userObj => {this.setState(userObj)})
        .catch(err => console.log('Error while mounting component, UserPage.js', err))
    }
    
    componentDidMount(){
        this.getUserInfo()
    }

    componentDidUpdate(nextProps) {
        if(this.state === {}) {
          return true
        }
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
          return;
        };
    }

    render() {
        //console.log(this.state)
        const { logout } = this.props;
        const {username, email, genre} = this.state
        console.log(this.props.history)

        return (
            <div>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Prefered genre: {genre}</p>
                <Link to={"/myprofile/edit"}>
                    <button className="navbar-button">Edit your profile</button>
                </Link>
                <hr/>
                <button className="navbar-button" onClick={logout}>
                    Logout
                </button>
                
                <Navbar />
            </div>
        )
    }
}

export default withAuth(UserPage)
