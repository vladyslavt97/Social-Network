import "./otherprofile.css"
import {useState, useEffect} from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { FriendRequestsButton } from './friend_req_button/friend_req_button';
import { useSelector } from "react-redux";
import { FriendsState } from "../../redux/rootReducer";
import { Friend } from "../../interface";

export function OtherProfile(){
    const {id} = useParams();
    const users = useSelector<FriendsState, Friend[]>((state) => state.friends);
    // const usersAccepted = useSelector<FriendsState, Friend[]>((state) => state.friends.filter((el)=>{
    //     return !el.accepted;
    // }));
    
    const otherUserProfile = users.find(el=> {
        console.log('elll: ', el.id);
        console.log('id: ', +id);
       return el.id === +id;
    });//explicitly cast to a number
    console.log('otherUserProfile', otherUserProfile);
    
    // useEffect(() => {
    //     fetch(`/userprofile/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then(data=>{
    //             setOtherUserProfile(data.otherProfile[0]);
    //         })
    //         .catch(err=>{
    //             console.log('if threre is no match for user:id = output a message "no page found"', err);
    //         });
    // },[id]);
    
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