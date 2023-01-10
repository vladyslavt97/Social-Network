import { Component, FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { ProfilePic } from '../app_components/profilepic';
import { ProfilePicLarge } from './profilepiclarge/profilepiclarge';

// interface ProfileState {
//       email: string,
//       password: string,
//   }

export class Profile extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: false,
            imgFromApp: false,
        };
    }

    render() {
        return <div>
            <h2>Profile Page</h2>
            <ProfilePicLarge 
            imgFromApp = {this.props.imgFromApp}
            userInfo = {this.props.userInfo}
            />
        </div>
    }
}