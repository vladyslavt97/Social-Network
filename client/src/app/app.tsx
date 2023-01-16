import { Component, FormEvent } from 'react';
import { Logo } from '../components/logo';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Profile } from './profile/profile';
import { FindPeople } from './findpeople/findpeople';
import { Friends } from './friends/friends';
import { Signout } from './app_components/signout';
import { Notifications } from './app_components/notifications/notifications';
import Uploader from './app_components/uploader/uploader';
import {ProfilePic} from './app_components/profilepic';
import "./app.css"
import { OtherProfile } from "./findpeople/otherprofile/otherprofile"
import { UserInfo } from './interface';
import { OnlineUsers } from './onlineusers/onlineusers';





interface AppState {
    userInfo: UserInfo,
    isPopupOpen: boolean,
    file: File | null,
    textarea: string,
    bioInDb: object,
  }
interface AppProps {}


export class App extends Component<AppProps, AppState, UserInfo> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            isPopupOpen: false,
            userInfo: {
                first: "",
                last: "",
                bio: "",
                email: "",
                profile_pic_url: ""              
            },
            file: null,
            textarea: '',
            bioInDb: {},
        };
        // bind stuff if you use normal functions
        this.togglePopup = this.togglePopup.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.handlePPUpload = this.handlePPUpload.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }


    componentDidMount() {
        fetch('/user', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                this.setState({ userInfo:data.userData });
                console.log('GET: ', data.userData);
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
                this.setState({...this.state, userInfo: {...this.state.userInfo, profile_pic_url:data.myPic.rows[0].profile_pic_url}, 
                    isPopupOpen:false});
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
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    // updateNotificationInApp({

    // })

    render() {
        return <div>
            <Logo />
            <div id='gridsetup'>
                <h1 id="page-test">Welcome, {this.state.userInfo.first} {this.state.userInfo.last}</h1>
                <div id='sidebar'>
                        <ProfilePic
                        userInfo = {this.state.userInfo}
                        togglePopup={this.togglePopup}
                        />
                        {this.state.isPopupOpen && (
                            <Uploader 
                                togglePopup={this.togglePopup} 
                                handlePPUpload={this.handlePPUpload}
                                handleFileChange={this.handleFileChange}
                                />
                        )}
                        <Signout />
                        <OnlineUsers />
                </div>
                <div id='main-screen'>
                    <BrowserRouter>
                    <Link to="/" ><img src="/profilepage.png" alt="profilepage" id='profilepageimg'/></Link>
                    <Link to="/users" ><img src="/findpeople.png" alt="findpeople" id='findpeopleimg'/></Link>
                    <Link to="/friends" ><img src="/friends.png" alt="friends" id='friendsimg'/></Link>
                    <Link to="/messages" ><img src="/messages.png" alt="messages" id='messagesimg'/></Link>
                    {/* <Link to="/calls" ><img src="/calls.png" alt="calls" id='callsimg'/></Link> */}

                    <Routes>
                        <Route path="/" 
                                element={<Profile 
                                userInfo = {this.state.userInfo}/>}>
                        </Route>
                        <Route path="/users" 
                                element={<FindPeople />}
                                ></Route>
                        <Route path="/user/:id" 
                                element={<OtherProfile />
                                }></Route>
                        <Route path="/friends" 
                                element={<Friends />}
                                ></Route>
                    </Routes>
                    <Notifications />
                </BrowserRouter>
                </div>
            </div>
        </div>
    }
}