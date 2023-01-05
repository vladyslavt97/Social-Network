import { Component, FormEvent} from 'react';
import { Logo } from '../../components/logo';
interface RegistrationState {
      firstname: string,
      lastname: string,
      email: string,
      password: string,
  }

export class Registration extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            // data: null,
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
        // componentDidMount() {
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
                        // console.log('this.commentid reply',this.imageid);
                        // this.replies.push(data.myReply);
                        if(data.validation === false){
                            alert('generate the error');
                            console.log('generate the error');
                            // this.setState({ data: data,
                            // });
                            
                        } else {
                            console.log("don't");
                        }
                        // location.reload();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
        // }
    }

    render() {
        console.log('state: ', this.state);
        return <div>
            <Logo />
            <h1 id='bookface'>Bookface</h1>

            <form onSubmit={this.handleSubmit} id="registration-form">
                <div>
                    <span>Firstname: </span>
                    <input name="firstname" onChange={this.handleInputChange} />
                    <span className='mandatory-field'>*</span>
                </div>
                <div>
                    <span>Lastname: </span>
                    <input name="lastname" onChange={this.handleInputChange} />
                    <span className='mandatory-field'>*</span>
                </div>
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
                <button>Register</button>
            </form>
            {/* link to login page with <a> tag */}
            <a href="/" id='login'>LOGIN</a>
            <img src="circle.png" alt="circle" id='circle'></img>
            <img src="map.png" alt="map" id='map'></img>
        </div>
    }
}