import React from "react";
import Uploader from './uploader';

export default function ProfilePic({ togglePopup, imgFromApp, changeName }) {
    // console.log("PROPS in profilePic: ", props);
    imgFromApp = imgFromApp || "/default.png";

    return <div>
            <form action="">
                <img src="noprofile.png" alt="empty" id="no-profile-pic"/>
                <button> onClick={togglePopUp}</button>
                <button> onClick={changeName}</button>
                {/* passed from App. */}
                <Uploader user={user}/>
                <hr />
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
