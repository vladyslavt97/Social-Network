import "./ProfilePicLarge.css"
import { UserInfo } from '../../interface';

interface ProfilePicProps{
    userInfo: UserInfo,
}
export function ProfilePicLarge(props: ProfilePicProps) {
    
    props.userInfo.profile_pic_url = props.userInfo.profile_pic_url || "/noprofileg.gif";
    return <div >
            <img src={props.userInfo.profile_pic_url} alt={props.userInfo.first} id="no-profile-pic-large"/>
            <h1 id="profile-name">{props.userInfo.first} {props.userInfo.last}</h1>
            <h4 id="profile-email">{props.userInfo.email}</h4>
        </div>
}