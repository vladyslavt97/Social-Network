import { Component } from 'react';
import { Logo } from '../components/logo';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './profile/profile';
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
            file: null,
            profilePicUrl: null,
            imgFromApp: null,
        };
        // bind stuff if you use normal functions
        this.togglePopup = this.togglePopup.bind(this);
        this.handlePPUpload = this.handlePPUpload.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }
    componentDidMount() {
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
                this.setState({userInfo:data.userData[0]});//imgFromApp: data.userData[0].profile_pic_url
                this.setState({imgFromApp: data.userData[0].profile_pic_url});//imgFromApp: data.userData[0].profile_pic_url
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
            location.replace('/');
        });
    }
    handlePPUpload(event){
        event.preventDefault();

        const formData = new FormData();
        formData.append('uploadedfile', this.state.file);
        
        // do fetch afterwards as a POST request. With the response you update your images array.
        fetch('/upload', {
            method: 'POST', 
            body: formData
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({imgFromApp: data.myPic.rows[0].profile_pic_url, isPopupOpen:false});
            })
            .catch(err => {
                console.log('er: ', err);
            });
            
    }
    handleFileChange(event){
        this.setState({file: event.target.files[0]});
    }

    togglePopup(event) {
        event.preventDefault();
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }
    

    render() {
        return <div>
            <Logo />
            <div id='gridsetup'>
                <h1 id="page-test">Welcome, {this.state.userInfo.first} {this.state.userInfo.last}</h1>
                <div id='sidebar'>
                    <ProfilePic
                    imgFromApp = {this.state.imgFromApp}
                    userInfo = {this.state.userInfo}
                    togglePopup={this.togglePopup}
                />
                {this.state.isPopupOpen && (
                    <Uploader handleClose={this.state.username}  
                                togglePopup={this.togglePopup} 
                                handlePPUpload={this.handlePPUpload}
                                handleFileChange={this.handleFileChange}
                                />
                )}
                <img src="friends.png" alt="friends" />
                    <Signout signOut={this.signOut}/>
                </div>
                <div id='main-screen'>
                    <Profile imgFromApp = {this.state.imgFromApp}
                    userInfo = {this.state.userInfo}
                    profilePicUrl = {this.state.profilePicUrl}
                    togglePopup={this.togglePopup}
                    />
                </div>
            </div>
        </div>
    }
}