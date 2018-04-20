import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: undefined,
            firstName: '',
            lastName: ''
        };
    }

    // Gets run at initial load of page after the render function
    componentDidMount() {
        axios.get(`http://localhost:3001/api/Users`).then(res => { this.setState({ Users: res.data }); });
    }

    // Changes the states above to the value given by the user
    changeInput(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    // Submits user inputed data to the server for processing
    submitUser() {
        // axios.post(`http://localhost:3001/api/Secure?firstName=${this.state.firstName}&lastName=${this.state.lastName}`)
        axios.post(`http://localhost:3001/api/Vulnerable?firstName=${this.state.firstName}&lastName=${this.state.lastName}`)
            .then(res => {
                this.setState({ firstName: '', lastName: '' });
                axios.get(`http://localhost:3001/api/Users`).then(res => { this.setState({ Users: res.data }); });
            });
    }

    // Renders the page. Runs at initial load and every time a state changes
    render() {
        // Converts users recieved from the database into a format usable by the table below
        var users = <tr><td>No users found.</td></tr>
        if (this.state.Users !== undefined) {
            users = this.state.Users.map(function (us, ind) {
                return (
                    <tr key={ind}>
                        <td>{us.FIRST_NAME}</td>
                        <td>{us.LAST_NAME}</td>
                        <td>{us.ROLE}</td>
                    </tr>
                );
            });
        }

        // Returns what is rendered on the page
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>

                <br />

                <label> First Name: </label>
                <input type='text' id='firstName' value={this.state.firstName} onChange={this.changeInput.bind(this)} />

                <label> Last Name: </label>
                <input type='text' id='lastName' value={this.state.lastName} onChange={this.changeInput.bind(this)} />

                <br /><br />

                <button onClick={this.submitUser.bind(this)}>Add User</button>

                <br /> <br />

                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users}
                    </tbody>
                </table>

                <p>','User); Delete from USERS where FIRST_NAME = '';--</p>
                <p>','User); Update USERS set Role = 'Admin' where FIRST_NAME = '';--</p>
                <p>','User); Drop Table USERS;--</p>
            </div>
        );
    }
}

// Exports the component to be used in other files
export default App;
