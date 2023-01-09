import { Component } from 'react';
import { Logo } from '../components/logo';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Profile } from './profile/profile';
// import { Friends } from './friends/friends';
import { Signout } from './app_components/signout';
import Uploader from './app_components/uploader/uploader';
import {ProfilePic} from './app_components/profilepic';

// import { Link } from "react-router-dom";
interface AppState {
      isPopupOpen: boolean,
      username: string,
  }

export class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            username: "Mint",
        };
        // bind stuff if you use normal functions
        this.togglePopup = this.togglePopup.bind(this);
    }
    componentDidMount() {
        console.log("Component Mounted");
        // fetch informartion from the server
        fetch('/user', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: this.state.email, password: this.state.password }),
                })
                    .then((response) => 
                        response.json())
                    .then((data) => {
                        if(data.validation === true){
                            console.log('generate the error');
                            this.setState({validation: true, incorrectData: false});
                        } else if(data.incorrectData === true){
                            this.setState({validation: false, incorrectData: true});
                        } else {
                            console.log("all good. Go to app page..?");
                            location.replace('/');
                            // location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
    }
    signOut(event){
        event.preventDefault();
        fetch('/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('signed out', data)
            location.replace('/');
        });
    }

    togglePopup(event) {
        event.preventDefault();
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }
    

    render() {
        return <div>
            <Logo />
            <div id='menu'>
                <h1 id="page-test">Welcome to the App! This is User experience!!!</h1>
                <div id='sidebar'>
                    <ProfilePic
                    togglePopup={this.togglePopup}
                />
                {this.state.isPopupOpen && (
                    <Uploader handleClose={this.state.username}  togglePopup={this.togglePopup}/>
                )}
                    <Signout signOut={this.signOut}/>
                    {/* <span>Profile</span> */}
                {/* <span><Link to="/profile" id='profile'>Profile</Link></span> */}
                </div>
                <div id='main-screen'></div>
            </div>
        </div>
    }
}

// 