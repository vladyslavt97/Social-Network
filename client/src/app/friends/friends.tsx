import { useEffect, useState } from "react"
import "./friends.css"
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { receiveFriends } from "../redux/friends/slice.js";
import ButtonAcceptFriendship from "./button-accept/button-accpet";
import ButtonRejectFrienship from "./button-reject/button-reject";

interface Friends{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
    email: string
}

export function Friends (){
    const state = useSelector((state) => state);
    console.log('state!: ', state);
    
    const [friends, setFriends] = useState<Friends []>([]);
    const dispatch = useDispatch();
    //fetch the info of friend_requests
    useEffect(() => {
        fetch(`/friendss`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriends(data.myFriends)
            dispatch(receiveFriends(data.myFriends));

        })
        .catch(err => {
                console.log('er in fetching friends: ', err);
            });
    }, [])

    //to be friends
    const [wannabees, setWannabeees] = useState([]);

    useEffect(() => {
        fetch(`/notifications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setWannabeees(data.notificationsForMe)
        })
        .catch(err => {
                console.log('er in fetching notifications: ', err);
            });
    }, [])



    return <div>
                <div id="allfriends-and-wannabees">
                    <div id="friends">
                        {friends.length !== 0 && <div id="big-friends-div">
                                    <h2 id="friends">Friends</h2>
                                    {friends.map(friend => (
                                                <div key={friend.id} >
                                                        <div id="friends-div">
                                                        <Link to={`/user/${friend.id}`} id="link-decoration-none">
                                                            <img src={friend.profile_pic_url} alt={friend.first} 
                                                            id='friends-img'/>
                                                            <h1 id='friends-text'>{friend.first} {friend.last}</h1>
                                                        </Link>
                                                        <ButtonRejectFrienship id={friend.id}/>
                                                        </div>
                                                </div>
                                            )
                                        )}
                                    </div>}
                        {friends.length ===0 && <div id="no-friends">
                                        <h2 id="no-friends-text">You have no friends 😥 </h2>
                                    </div>}
                    </div>
                    <div id="separating-line"></div>

                    {/* who wants to be my friend */}
                    <div id="friend-reqs">
                        {wannabees.length !== 0 && <div id="big-tobe-friends-div">
                                    <h2 id="friends">Want to be friends</h2>
                                        
                                    {wannabees.map(wannabe => (
                                                <div key={wannabe.id} >
                                                        <div id="tobe-friends-div">
                                                            <Link to={`/user/${wannabe.id}`} id="link-decoration-none">
                                                                <img src={wannabe.profile_pic_url} alt={wannabe.first} 
                                                                id='friends-img'/>
                                                                <h1 id='friends-text'>{wannabe.first} {wannabe.last}</h1>
                                                                {/* <button onClick={handleUpdate}>Accept ✅</button> */}
                                                            </Link>
                                                            <ButtonAcceptFriendship id={wannabe.id}/>
                                                        </div>
                                                </div>
                                            )
                                        )}
                                    </div>}
                        {wannabees.length ===0 && <div id="no-tobe-friends">
                                        <h2 id="no-tobe-friends-text">No new friend requests 😥</h2>
                                    </div>}
                    </div>
                </div>
            </div>
}