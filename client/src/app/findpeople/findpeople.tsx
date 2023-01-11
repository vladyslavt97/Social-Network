import { Component, FormEvent} from 'react';
import { Link } from 'react-router-dom';

// interface FindPeopleState {
//       email: string,
//       password: string,
//   }

export class FindPeople extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return <div>
            <h1 id='findpeople'>Find People Component</h1>
        </div>
    }
}