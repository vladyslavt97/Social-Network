import "./ProfilePicLarge.css"

export function ProfilePicLarge({ userInfo, imgFromApp}: { userInfo: any; imgFromApp: any;}) {
    // console.log("PROPS in profilePic: ", props);
    
    imgFromApp = imgFromApp || "/noprofile.png";
    // console.log('sdsda', userInfo);
    return <div >
            <img src={imgFromApp} alt={userInfo.first} id="no-profile-pic-large"/>
        </div>
}