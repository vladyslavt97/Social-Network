import { Component, FormEvent} from 'react';
import { Validation } from '../../components/validation';
import { IncorrectData } from '../../components/incorrectdata';
import { Link } from 'react-router-dom';

interface LoginState {
      email: string,
      password: string,
      validation: boolean,
      incorrectData: boolean,
  }

interface LoginProps{}

export class Login extends Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validation: false,
            incorrectData: false,
        };

    }

    handleInputChange = (evt) => {
        const property = evt.target.name; // will hold 'firstname' when input for firstname is changed
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    }

    handleSubmit = (evt: FormEvent) => {
        console.log('clicked');
        
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
                        if(data.validation === true){
                            console.log('generate the error');
                            this.setState({validation: true, incorrectData: false});
                        } else if(data.incorrectData === true){
                            this.setState({validation: false, incorrectData: true});
                        } else {
                            console.log("all good. Go to app page..?");
                            location.replace('/');
                            // location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
    }

    render() {
        // console.log('state??: ', this.state);
        return <div>
            {this.state.validation && <Validation />}
            {this.state.incorrectData && <IncorrectData />}

            <form onSubmit={this.handleSubmit} id="registration-form">
                <div>
                    <span>Email: </span>
                    <input name="email" onChange={this.handleInputChange} />
                    <b className='mandatory-field'>*</b>
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" name="password" onChange={this.handleInputChange} />
                    <b className='mandatory-field'>*</b>
                </div>
                <button type='submit'>Login</button><br />
                <h3> You might want to <Link to="/" id='login'>Register</Link> first...</h3><br />
                <h3>Did you forget your <Link to="/reset" >password</Link>?</h3>
            </form>
        </div>
    }
}