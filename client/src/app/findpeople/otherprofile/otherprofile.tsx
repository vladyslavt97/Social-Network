import "./otherprofile.css"
import {useState, useEffect} from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { FriendRequestsButton } from './friend_req_button/friend_req_button';

export function OtherProfile(){
    let { id } = useParams();

    const [otherUserProfile, setOtherUserProfile] = useState<any>({});
    useEffect(() => {
        fetch(`/userprofile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(data=>{
                setOtherUserProfile(data.otherProfile[0]);
            })
            .catch(err=>{
                console.log('if threre is no match for user:id = output a message "no page found"', err);
            });
    },[id]);
    
    return <div id="otherpeoplecomponentdiv">
        <h1 id="otherpeoplecomponent">User details</h1>
        <img id="otherprofilecompponentimg"
        src={otherUserProfile.profile_pic_url} alt={otherUserProfile.first} />
        <h5 id="otherpeoplecomponentinfo">{otherUserProfile.first}{otherUserProfile.last}</h5>
        <h6 id="otherpeoplecomponentinfo">{otherUserProfile.email}</h6>
        <h6 id="otherpeoplecomponentinfobio">{otherUserProfile.bio}</h6>
        <FriendRequestsButton />
    </div>
}