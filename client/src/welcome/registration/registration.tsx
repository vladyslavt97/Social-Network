import { Component, FormEvent } from 'react';

interface RegistrationState {
      firstname: string,
      lastname: string,
      email: string,
      password: string,
  }

export class Registration extends Component<any, RegistrationState> {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
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
                    // console.log('this.commentid reply',this.imageid);
                    // this.replies.push(data.myReply);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }

    render() {
        console.log('state: ', this.state);
        return <div>
            <h1>Welcome to MY SOCIAL NETWORK</h1>
            {/* <LogoComponent/> */}
            <p>Lorum ipsum</p>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <span>Firstname</span>
                    <input name="firstName" onChange={this.handleInputChange} />
                </div>
                <div>
                    <span>Lastname</span>
                    <input name="lastName" onChange={this.handleInputChange} />
                </div>
                <div>
                    <span>Email</span>
                    <input name="email" onChange={this.handleInputChange} />
                </div>
                <div>
                    <span>Password</span>
                    <input name="password" onChange={this.handleInputChange} />
                </div>
                <button>Register</button>
            </form>
            {/* link to login page with <a> tag */}
        </div>
    }
}