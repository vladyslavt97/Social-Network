import { File } from "aws-sdk/lib/dynamodb/document_client";
import React, { Component } from "react";
// import { ProfilePic } from '../profilepic';

interface UploaderProps {
    togglePopup: Function,
    handlePPUpload: object,
    handleFileChange: File,
}
interface UploaderState{}

export default class Uploader extends Component<UploaderProps, UploaderState> {
    constructor(props: UploaderProps) {
        super(props);
        this.state = {
            togglePopup: false,
            handlePPUpload: false,
            handleFileChange: File,
        };
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
    }
}