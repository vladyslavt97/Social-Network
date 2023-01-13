import { File } from "aws-sdk/lib/dynamodb/document_client";
import React, { Component } from "react";
// import { ProfilePic } from '../profilepic';

interface UploaderProps {
    togglePopup: boolean,
    handlePPUpload: object,
    handleFileChange: File,
}
interface UploaderState{}

export default class Uploader extends Component<UploaderProps, UploaderState> {
    constructor(props) {
        super(props);
        this.state = {
             togglePopup: false,
             handlePPUpload: false,
        };
    }
    componentDidMount() {
        // console.log("uploader mounted!");
    }

    render() {
        return <div>
                <div id="backdrop" onClick={this.props.togglePopup}></div>
                <form onSubmit={this.props.handlePPUpload} className="file-upload">
                    <h1 id="reset-stages">Want to change you profile picture?</h1>
                    <br />
                    <input type="file" name="uploadedfile" accept="image/*" 
                    onChange={this.props.handleFileChange}
                    />
                    <button >Upload</button>
                </form>
            </div>;
        // Here you will need to create a form to send a image file, just like in the Image Board 
    }
}