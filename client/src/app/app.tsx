import { Component } from 'react';
import { Logo } from '../components/logo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './profile/profile';
import { Friends } from './friends/friends';


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
        </div>
    }
}