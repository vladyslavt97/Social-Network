import { Component } from "react";
import { Link } from "react-router-dom";

import { Validation } from '../../components/validation';
import { IncorrectData } from '../../components/incorrectdata';

interface ResetState {
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      validation: boolean,
      incorrectData: boolean,
  }
interface ResetProps{}

export class Reset extends Component <ResetProps, ResetState> {
    constructor(props: ResetProps) {
        super(props);
        this.state = { 
            step: 1,
            validation: false,
            incorrectData: false,
        };
        this.whatToRender = this.whatToRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        switch (this.state.step) {
            case 1:
                // Make a Post request to server and check if the user exists
                fetch('/emailcheck', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: this.state.email }),
                })
                    .then((response) => 
                        response.json())
                    .then((data) => {
                        if(data.validation === true){
                            console.log('generate the error');
                            this.setState({validation: true, incorrectData: false});
                        } else if (data.incorrectData === true){
                            console.log('generate the error');
                            this.setState({validation: false, incorrectData: true});
                        } else {
                            console.log("validation and incorrectData passed!");
                            this.setState({step: 2 });
                            // location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                break;
            case 2:
                // Make a Post request to server and check if the user exists
                fetch('/verify', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: this.state.code, password: this.state.password }),
                })
                    .then((response) => 
                        response.json())
                    .then((data) => {
                        // this.setState({validation: false, incorrectData: false});
                        if(data.validation === true){
                            console.log('generate the error');
                            this.setState({validation: true, incorrectData: false});
                        } else if (data.incorrectData === true){
                            console.log('generate the error');
                            this.setState({validation: false, incorrectData: true});
                        } else {
                            console.log("don't show error");
                            this.setState({step: 3 });
                            // location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                break;
            default:
                break;
        }
    }

    whatToRender() {
        switch (this.state.step) {
            case 1:
                return (
                <div>
                    <form onSubmit={this.handleSubmit} id="registration-form">
                    <h1 id="reset-stages">Enter your Email to get a verification code!</h1>
                        <div>
                            <span>Email: </span>
                            <input name="email" onChange={this.handleChange} />
                            <b className='mandatory-field'>*</b>
                        </div>
                        <button>Send the code</button>
                        <h3> Or try to <Link to="/login" >LOGIN</Link> again or <Link to="/" id='login'>Register</Link>... </h3>
                    </form>
                </div>
                );
            case 2:
                return (
                <div>
                    <form onSubmit={this.handleSubmit} id="registration-form">
                    <h1 id="reset-stages">Enter your code and pwd to complete the process!</h1>
                        <div>
                            <span>Code: </span>
                            <input name="code" onChange={this.handleChange} />
                            <b className='mandatory-field'>*</b>
                        </div>
                        <div>
                            <span>New password: </span>
                            <input type="password" name="password" onChange={this.handleChange} />
                            <b className='mandatory-field'>*</b>
                        </div>
                        <button>Reset</button>
                    </form>
                </div>
                );
            case 3:
                return <div id="registration-form">
                            <h1 id="reset-stages">Congrats! you can copy & paste..😊</h1>
                            <h1 id="reset-stages">You've completed the chalenge!☃️ <br />
                            Now you can <Link to="/login" id="login-reset">Login</Link></h1>
                        </div>;
            default:
                break;
        }
    }

    render() {
        return <div>{this.whatToRender()};
                <h1 id='bookface'>Bookface</h1>
                {this.state.validation && <Validation />}
                {this.state.incorrectData && <IncorrectData />}
                {/* <Link to="/login" id='login'>Register</Link> */}
        </div>
    }
}