import "./otherprofile.css"
import { useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
import { Friend } from "../../interface";
import { FriendRequestsButton } from './friend_req_button/friend_req_button';
import { FriendsState } from "../../redux/friendsSlice";
import { useEffect, useState } from "react";

export function OtherProfile(){
    const {id} = useParams();

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

    const [mutualFreinds, setMutualFriends] = useState<any>({});
    useEffect(() => {
        fetch(`/mutual/friends/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(data=>{
                console.log('data in other profile. 2nd useEffect', data.result);
                setMutualFriends(data.result);
            })
            .catch(err=>{
                console.log('if threre is no match for user:id = output a message "no page found"', err);
            });
    },[id]);
    
    return <div id="otherpeoplecomponentdiv">
        <h1 id="otherpeoplecomponent">User detailss</h1>
        <img id="otherprofilecompponentimg"
        src={otherUserProfile.profile_pic_url} alt={otherUserProfile.first} />
        <h1>Mutual friends: {mutualFreinds.length}</h1>
        <h5 id="otherpeoplecomponentinfo">{otherUserProfile.first}{otherUserProfile.last}</h5>
        <h6 id="otherpeoplecomponentinfo">{otherUserProfile.email}</h6>
        <h6 id="otherpeoplecomponentinfobio">{otherUserProfile.bio}</h6>
        <FriendRequestsButton />
    </div>
}