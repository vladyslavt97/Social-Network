import { Component, FormEvent} from 'react';
import { ProfilePicLarge } from './profilepiclarge/profilepiclarge';
import { Bio } from './bio/Bio';
import { Deletion } from './deletion/deletion_btn';
import { UserInfo } from '../interface';

interface ProfileState {}

interface ProfileProps{
    userInfo: UserInfo,
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
            userInfo = {this.props.userInfo}
            />
            <Bio 
            userInfo = {this.props.userInfo}
            />
            <Deletion />
        </div>
    }
}