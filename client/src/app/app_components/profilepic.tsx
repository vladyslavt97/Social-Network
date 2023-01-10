import React from "react";
import Uploader from './uploader/uploader';

export function ProfilePic({ togglePopup, userInfo, imgFromApp }: {
        togglePopup: any;
        userInfo: any;
        imgFromApp: any;
    }) {
    // console.log("PROPS in profilePic: ", props);
    imgFromApp = imgFromApp || "/noprofile.png";
        
    return <div>
            <form>
                <img src={imgFromApp} alt={userInfo.first} id="no-profile-pic"/>
                <h1>{userInfo.bio}</h1>
                <button onClick={togglePopup} id="upload-button">
                        <img src="upload.png" alt="upload" id="upload-img"/>
                    </button>
            </form>
            </div>
}

