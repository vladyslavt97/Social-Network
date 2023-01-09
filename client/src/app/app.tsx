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
      userInfo: object,
  }

export class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            username: "Mint",
            userInfo: {},
        };
        // bind stuff if you use normal functions
        this.togglePopup = this.togglePopup.bind(this);
    }
    componentDidMount() {
        console.log("Component Mounted");
        // fetch informartion from the server
        fetch('/user', {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => 
                        response.json())
                    .then((data) => {
                        console.log("all good. Go to app page..?", data.userData[0]);
                        this.setState({userInfo:data.userData[0]});
                    })
                    .catch((error) => {
                        console.error('Error caught:', error);
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
                <h1 id="page-test">Welcome, {this.state.userInfo.first} {this.state.userInfo.last}</h1>
                <div id='sidebar'>
                    <ProfilePic
                    userInfo = {this.state.userInfo}
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