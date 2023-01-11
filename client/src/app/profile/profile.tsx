import { Component, FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { ProfilePic } from '../app_components/profilepic';
import { ProfilePicLarge } from './profilepiclarge/profilepiclarge';
import { Bio } from './bioeditor/bioeditor';

// interface ProfileState {
//       email: string,
//       password: string,
//   }

export class Profile extends Component<any, any> {

    constructor(props) {
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
            showBET = {this.props.showBET}
            // handleBioSubmit={this.props.handleBioSubmit}
            // handleBioChange={this.props.handleBioChange}
            // showBioEditorTextarea={this.props.showBioEditorTextarea}
            // showBioEditorButton={this.props.showBioEditorButton}
            />
        </div>
    }
}