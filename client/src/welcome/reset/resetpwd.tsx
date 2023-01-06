import { Component } from "react";
import { Link } from "react-router-dom";

import { Error } from '../../components/error';
import { IncorrectData } from '../../components/incorrectdata';

// interface ResetState {
//       firstname: string,
//       lastname: string,
//       email: string,
//       password: string,
//   }

export class Reset extends Component <any, any> {
    constructor(props) {
        super(props);
        this.state = { step: 1 };
        this.whatToRender = this.whatToRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
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
                this.setState({ step: 2 });
                break;
            case 2:
                this.setState({ step: 3 });
                break;

            default:
                break;
        }
    }

    whatToRender() {
        switch (this.state.step) {
            case 1:
                return <h1>Enter your Email and I will send a verification code!</h1>;
            case 2:
                return <h1>Enter your email and pwd to complete the process!</h1>;
            case 3:
                return <h1>well done! You will be redirected to the next page</h1>;

            default:
                break;
        }
    }

    render() {
        return <div>{this.whatToRender()};
                <h1 id='bookface'>Bookface</h1>
                    {this.state.error && <Error />}
                    {this.state.incorrect && <IncorrectData />}

                <form onSubmit={this.handleSubmit} id="registration-form">
                    <div>
                        <span>Code: </span>
                        <input name="code" onChange={this.handleChange} />
                        <span className='mandatory-field'>*</span>
                    </div>
                    <div>
                        <span>Password: </span>
                        <input type="password" name="password" onChange={this.handleChange} />
                        <span className='mandatory-field'>*</span>
                    </div>
                    <button>Reset</button>
                </form>
                <Link to="/" id='login'>Register</Link>
        </div>
    }
}