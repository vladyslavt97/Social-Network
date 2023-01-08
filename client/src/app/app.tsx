import { Component } from 'react';
import { Logo } from '../components/logo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './profile/profile';
import { Friends } from './friends/friends';
import { ChangeProfilePic } from './app_components/change_profile_pic';
import { Link } from "react-router-dom";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // bind stuff if you use normal functions
    }

    render() {
        return <div>
            <Logo />
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/friends" element={<Friends />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
            <div id='menu'>
                <div id='sidebar'>
                    <ChangeProfilePic />
                    {/* <span>Profile</span> */}
                {/* <span><Link to="/profile" id='profile'>Profile</Link></span> */}
                </div>
                <div id='main-screen'></div>
            </div>
        </div>
    }
}