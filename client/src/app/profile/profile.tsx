import { Component, FormEvent} from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/friends" >Friends</Link>

        </div>
    }
}