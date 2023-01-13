import { Component, FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { ProfilePic } from '../app_components/profilepic';
import { ProfilePicLarge } from './profilepiclarge/profilepiclarge';
import { Bio } from './bio/Bio';

interface ProfileState {}

interface ProfileProps{
    imgFromApp: File,
    userInfo: {},
    bioInDb: {}
}

export class Profile extends Component<ProfileProps, ProfileState> {

    constructor(props: ProfileProps) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return <div>
            <h1 id='profile'>My Profile</h1>
            <ProfilePicLarge 
            imgFromApp = {this.props.imgFromApp}
            userInfo = {this.props.userInfo}
            />
            <Bio 
            bioInDb = {this.props.bioInDb}
            />
        </div>
    }
}