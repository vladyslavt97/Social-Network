import React from "react";
import Uploader from './uploader/uploader';

export function ProfilePic({ togglePopup, userInfo, imgFromApp }: {
        togglePopup: any;
        userInfo: any;
        imgFromApp: any;
    }) {
    imgFromApp = imgFromApp || "/noprofile.png";
        
    return <div>
                <img src={imgFromApp} alt={userInfo.first} id="no-profile-pic" onClick={togglePopup}/>
            </div>
}

