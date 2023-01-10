import "./ProfilePicLarge.css"

export function ProfilePicLarge({ userInfo, imgFromApp}: { userInfo: any; imgFromApp: any; }) {
    // console.log("PROPS in profilePic: ", props);
    console.log('imgFromApp', imgFromApp);
    
    imgFromApp = imgFromApp || "/noprofile.png";
    // console.log('sdsda', userInfo);
    return <div >
            <h1>Profile Picture Large</h1>
            <img src={imgFromApp} alt={userInfo.first} id="no-profile-pic-large"/>
        </div>
}