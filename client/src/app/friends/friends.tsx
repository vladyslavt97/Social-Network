import { Component, FormEvent} from 'react';
import { Link } from 'react-router-dom';

interface FriendsState {
      email: string,
      password: string,
  }

export class Friends extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return <div>
            <h2>List of Friends Page</h2>
            <Link to="/profile" >Back to profile page</Link>
        </div>
    }
}