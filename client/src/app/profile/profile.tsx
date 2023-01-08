import { Component, FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { ChangeProfilePic } from '../app_components/change_profile_pic';

interface ProfileState {
      email: string,
      password: string,
  }

export class Profile extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <div>
            <h2>Profile Page</h2>
            {this.state.uploaded && <ChangeProfilePic />}
            <Link to="/friends" >Friends</Link>

        </div>
    }
}