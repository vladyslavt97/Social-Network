import { Component, FormEvent } from 'react';
import { Logo } from '../components/logo';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Profile } from './profile/profile';
import { FindPeople } from './findpeople/findpeople';
import { Signout } from './app_components/signout';
import Uploader from './app_components/uploader/uploader';
import {ProfilePic} from './app_components/profilepic';
import "./app.css"
import { OtherProfile } from "./findpeople/otherprofile/otherprofile"

interface UserInfo {
    first: string,
    last: string,
}
interface AppState {
    username: string,
    userInfo: UserInfo,
    isPopupOpen: boolean,
    file: File | null,
    profilePicUrl: null,
    imgFromApp: null,
    textarea: string,
    bioInDb: object,
    togglePopup: boolean,
  }
interface AppProps {}


export class App extends Component<AppProps, AppState, UserInfo> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            isPopupOpen: false,
            username: "Mint",
            userInfo: {
                first: "",
                last: "",
            },
            file: null,
            profilePicUrl: null,
            imgFromApp: null,
            textarea: '',
            bioInDb: {},
            togglePopup: false,
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
                this.setState({userInfo:data.userData,
                                imgFromApp: data.userData.profile_pic_url,
                                bioInDb: data.userData});
            })
            .catch((error) => {
                console.error('Error caught:', error);
            });
    }

    handlePPUpload(event: FormEvent){
        event.preventDefault();
        if (this.state.file === null){
            return;
        }
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
    
    handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files?.length) {
            this.setState({file: event.target.files[0]});
        }
    }

    togglePopup() {
        // event.preventDefault();
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
                    <Uploader 
                    // handleClose={this.state.username}  
                                togglePopup={this.togglePopup} 
                                handlePPUpload={this.handlePPUpload}
                                handleFileChange={this.handleFileChange}
                                />
                )}
                    <Signout />
                </div>
                <div id='main-screen'>
                    <BrowserRouter>
                    <Link to="/users" ><img src="/findpeople.png" alt="findpeople" id='findpeopleimg'/></Link>
                    <Link to="/" ><img src="/profilepage.png" alt="profilepage" id='profilepageimg'/></Link>

                    <Routes>
                        <Route path="/" 
                                element={<Profile imgFromApp = {this.state.imgFromApp}
                                                userInfo = {this.state.userInfo}
                                                bioInDb = {this.state.bioInDb}
                                                // showBET= {this.state.showBET}
                                                profilePicUrl = {this.state.profilePicUrl}
                                        />}>
                        </Route>
                        <Route path="/users" 
                                element={<FindPeople />}
                                ></Route>
                        <Route path="/user/:id" 
                                element={<OtherProfile />
                                }></Route>
                    </Routes>
                </BrowserRouter>
                    
                </div>
            </div>
        </div>
    }
}