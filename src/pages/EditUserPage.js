import React, { Component } from 'react'
import userService from '../lib/user-service'
import {withRouter} from 'react-router-dom'

import { withAuth } from '../lib/AuthProvider'

import Navbar from '../components/navbar/Navbar'

class EditUserPage extends Component {
    state = {
        username: '',
        email: '',
        genre: '',
    };

    componentDidMount() {
        userService.getOne()
        .then(userObj => {
            const {username, email, genre} = userObj;
            this.setState({username, email, genre})
        })
        .catch(err => console.log('Error EditUserPage.js, line 15'))
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const {username, email, genre} = this.state;
        const updatedUser = {username, email, genre};


        userService.updateOne(updatedUser)
        .then((updatedUser) => this.props.history.push("/myProfile"))
        .catch(err => console.log(err))
    }

    render() {
        const {username, email, genre} = this.state
        return (
            <div>
                <h3>Edit your profile</h3>
                <form onSubmit={this.handleFormSubmit} >
                    <div>
                        <label>Username:</label>
                        <div>
                            <input
                            type="text"
                            name="username"
                            value={username} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Email address:</label>
                        <div>
                            <input
                            type="text"
                            name="email"
                            value={email} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Prefered genre:</label>
                        <div>
                            <input
                            type="text"
                            name="genre"
                            value={genre} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit">Save changes</button>
                </form>
                <Navbar />
            </div>
        )
    }
}

export default withRouter(withAuth(EditUserPage))