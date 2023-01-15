import { MouseEventHandler } from 'react';
import { UserInfo } from '../interface';

interface ProfilePicProps{
    userInfo: UserInfo,
    togglePopup: MouseEventHandler<HTMLImageElement>,
}

export function ProfilePic(props: ProfilePicProps) {
    props.userInfo.profile_pic_url = props.userInfo.profile_pic_url || "/noprofileg.gif";
    return <div>
                <img src={props.userInfo.profile_pic_url} alt={props.userInfo.first} 
                id="no-profile-pic" onClick={props.togglePopup}/>
            </div>
}

