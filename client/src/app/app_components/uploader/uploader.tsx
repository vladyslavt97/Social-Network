import React, { Component } from "react";
// import { ProfilePic } from '../profilepic';

export default class Uploader extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
             togglePopup: false,
            // username: '',
        };
    }
    componentDidMount() {
        // console.log("uploader mounted!");
    }

    render() {
        return <div>
            <div id="backdrop" onClick={this.props.togglePopup}></div>
                <label className="file-upload">
                    <h1 id="reset-stages">Want to change you profile picture?</h1>
                    <br />
                    <input type="file"/>
                    <i>Upload</i>
                </label>
            
            </div>;//{this.props.username} 
        // Here you will need to create a form to send a image file, just like in the Image Board 
    }
}