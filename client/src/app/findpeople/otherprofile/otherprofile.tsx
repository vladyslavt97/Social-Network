import "./otherprofile.css"
import { useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
import { Friend } from "../../interface";
import { FriendRequestsButton } from './friend_req_button/friend_req_button';
import { FriendsState } from "../../redux/rootReducer";
import { useEffect, useState } from "react";

export function OtherProfile(){
    const {id} = useParams();
    // const users = useSelector<FriendsState, Friend[]>((state) => state.friends);
    // console.log('users: ', users);
    

    // const otherUserProfile = users.find(el=> {
        //     console.log('elll: ', el.id);
        //     console.log('id: ', +id);
        //    return el.id === +id;//explicitly cast to a number
        // });
    // console.log('otherUserProfile', otherUserProfile);

    //user deos not exist in the list of users, because he/she might have never sent a friend request(accepted or not.)
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
                console.log('datadatadatadata', data.otherProfile[0]);
                
                setOtherUserProfile(data.otherProfile[0]);
            })
            .catch(err=>{
                console.log('if threre is no match for user:id = output a message "no page found"', err);
            });
    },[id]);
    
    return <div id="otherpeoplecomponentdiv">
        <h1 id="otherpeoplecomponent">User detailss</h1>
        <img id="otherprofilecompponentimg"
        src={otherUserProfile.profile_pic_url} alt={otherUserProfile.first} />
        <h5 id="otherpeoplecomponentinfo">{otherUserProfile.first}{otherUserProfile.last}</h5>
        <h6 id="otherpeoplecomponentinfo">{otherUserProfile.email}</h6>
        <h6 id="otherpeoplecomponentinfobio">{otherUserProfile.bio}</h6>
        <FriendRequestsButton />
    </div>
}