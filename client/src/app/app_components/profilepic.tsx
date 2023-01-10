import React from "react";
import Uploader from './uploader/uploader';

export function ProfilePic({ togglePopup, userInfo, imgFromApp }: {
        togglePopup: any;
        userInfo: any;
        imgFromApp: any;
    }) {
    // console.log("PROPS in profilePic: ", props);
    imgFromApp = imgFromApp || "/noprofile.png";
    console.log('sdsda', userInfo);
        
    return <div>
            <form>
                <img src={imgFromApp} alt={userInfo.first} id="no-profile-pic"/>
                <button onClick={togglePopup} id="upload-button">
                        <img src="upload.png" alt="upload" id="upload-img"/>
                    </button>
            </form>
            </div>
}

//


    // return (
    //     <>
    //         <button onClick={togglePopup}>Toggle Popup</button>
    //         <button onClick={() => changeName("Spiced")}>Change Name</button>
    //     </>
    // );
