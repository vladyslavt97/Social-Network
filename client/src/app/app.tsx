import { Component } from 'react';
import { Logo } from '../components/logo';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Profile } from './profile/profile';
// import { Friends } from './friends/friends';
import { Signout } from './app_components/signout';
import Uploader from './app_components/uploader';
import ProfilePic from './app_components/profilepic';

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
    }

    togglePopup() {
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    render() {
        return <div>
            <Logo />
            <div id='menu'>
                <h1>Welcome to the App! This is User experience</h1>
                <div id='sidebar'>
                    <ProfilePic
                    togglePopup={this.togglePopup}
                />
                {this.state.isPopupOpen && (
                    <Uploader username={this.state.username} />
                )}
                    <Signout />
                    {/* <span>Profile</span> */}
                {/* <span><Link to="/profile" id='profile'>Profile</Link></span> */}
                </div>
                <div id='main-screen'></div>
            </div>
        </div>
    }
}

// 