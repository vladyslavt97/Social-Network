export function ProfilePic({ togglePopup, userInfo, imgFromApp }: {
        togglePopup: boolean;
        userInfo: {};
        imgFromApp: File;
    }) {
    imgFromApp = imgFromApp || "/noprofile.png";
        
    return <div>
                <img src={imgFromApp} alt={userInfo.first} id="no-profile-pic" onClick={togglePopup}/>
            </div>
}

