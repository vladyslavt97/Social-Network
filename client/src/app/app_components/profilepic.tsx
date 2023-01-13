import { UserInfo } from '../interface';

interface ProfilePicProps{
    userInfo: UserInfo,
    togglePopup: Function,
}

export function ProfilePic(props: ProfilePicProps) {
    props.userInfo.profile_picture_url = props.userInfo.profile_picture_url || "/noprofile.png";
    console.log('props.userInfo in Profile Picture ', props.userInfo);
    console.log('props in Profile Picture ', props.userInfo.profile_picture_url);
    return <div>
                <img src={props.userInfo.profile_picture_url} alt={props.userInfo.first} 
                id="no-profile-pic" onClick={()=>{props.togglePopup}}/>
            </div>
}

