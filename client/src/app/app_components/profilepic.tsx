import React from "react";
import Uploader from './uploader/uploader';

export function ProfilePic({ togglePopup, userInfo }: {
        togglePopup: any;
        userInfo: any;
        // imgFromApp: any;
    }) {
    // console.log("PROPS in profilePic: ", props);
    // imgFromApp = imgFromApp || "/default.png";
        console.log('sdsda', userInfo);
        
    return <div>
            <form onClick={togglePopup}>
                <img src={userInfo.profile_pic_url} alt={userInfo.first} id="no-profile-pic"/>
                <button onClick={togglePopup} id="upload-button">
                        <img src="upload.png" alt="upload" id="upload-img"/>
                    </button>
                    {/* <button onClick={() => changeName("Spiced")}>Change Name</button> */}
                {/* passed from App. */}
                {/* <Uploader togglePopup={togglePopup}/> */}
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
