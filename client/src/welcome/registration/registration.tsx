import { ChangeEvent, Component, FormEvent} from 'react';
import { Validation } from '../components/validation';
import { Link } from 'react-router-dom';

interface RegistrationState {
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      validation: boolean,
  }
interface RegistrationProps{}

export class Registration extends Component<RegistrationProps, RegistrationState> {

    constructor(props: RegistrationProps) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            validation: false,
        };

    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const property = event.target.name; // will hold 'firstname' when input for firstname is changed
        // will update firstname prop dynamically in this.state variable
        this.setState({ ...this.state, [property]: event.target.value });
    }

    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        // make POST request with fetch
            fetch('/registration/', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password }),
                })
                    .then((response) => 
                        response.json())
                    .then((data) => {
                        console.log("success: ", data, 'and show ErrorNOT!!');
                        if(data.validation === true){
                            console.log('generate the error. Validation failed!');
                            this.setState({validation: true});
                        } else {
                            console.log("Should go to the Login page");
                            location.replace('/login');
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
    }

    render() {
        return <div>
            {this.state.validation && <Validation />}
            <form onSubmit={this.handleSubmit} id="registration-form">
                <div>
                    <span>Firstname: </span>
                    <input name="firstname" onChange={this.handleInputChange} />
                    <b className='mandatory-field'>*</b>
                </div>
                <div>
                    <span>Lastname: </span>
                    <input name="lastname" onChange={this.handleInputChange} />
                    <b className='mandatory-field'>*</b>
                </div>
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
                <button>Register</button>
            <h3> Already Registered? Then <Link to="/login" >LOGIN</Link></h3>
            </form>
        </div>
    }
}