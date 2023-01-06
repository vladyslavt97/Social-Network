import { Component, FormEvent} from 'react';
import { Error } from '../../components/error';
import { IncorrectData } from '../../components/incorrectdata';
import { Link } from 'react-router-dom';

interface LoginState {
      email: string,
      password: string,
  }

export class Login extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            incorrect: false,
        };

    }

    handleInputChange = (evt) => {
        const property = evt.target.name; // will hold 'firstname' when input for firstname is changed
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    }

    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        // make POST request with fetch
            fetch('/login/', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: this.state.email, password: this.state.password }),
                })
                    .then((response) => 
                        response.json())
                    .then((data) => {
                        if(data.validation === false){
                            console.log('generate the error');
                            this.setState({error: true});
                            if(data.incorrectData === false){
                                this.setState({incorrect: true});
                            }
                        } else {
                            console.log("don't");
                            location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
    }

    render() {
        console.log('state??: ', this.state);
        return <div>
            <h1 id='bookface'>Bookface</h1>
            {this.state.error && <Error />}
            {this.state.incorrect && <IncorrectData />}

            <form onSubmit={this.handleSubmit} id="registration-form">
                <div>
                    <span>Email: </span>
                    <input name="email" onChange={this.handleInputChange} />
                    <span className='mandatory-field'>*</span>
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" name="password" onChange={this.handleInputChange} />
                    <span className='mandatory-field'>*</span>
                </div>
                <button>Login</button>
            </form>
            <Link to="/" id='login'>Register</Link>
        </div>
    }
}