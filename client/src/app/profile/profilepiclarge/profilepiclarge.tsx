import "./ProfilePicLarge.css"
import { UserInfo } from '../../interface';

interface ProfilePicProps{
    userInfo: UserInfo,
}
export function ProfilePicLarge(props: ProfilePicProps) {
    
    props.userInfo.profile_pic_url = props.userInfo.profile_pic_url || "/noprofileg.gif";
    return <div >
            <img src={props.userInfo.profile_pic_url} alt={props.userInfo.first} id="no-profile-pic-large"/>
        </div>
}