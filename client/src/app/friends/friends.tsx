import { useEffect, useState } from "react"
import "./friends.css"
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { receiveFriends } from "../redux/friends/slice.js";

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

    return <div>
                <h2 id="friedns">Friends</h2>
                {friends.length !== 0 && <div id="big-friends-div">
                            {friends.map(friend => (
                                        <div key={friend.id} >
                                                <div id="friends-div">
                                                <Link to={`/user/${friend.id}`} id="link-decoration-none">
                                                    <img src={friend.profile_pic_url} alt={friend.first} 
                                                    id='friends-img'/>
                                                    <h1 id='friends-text'>{friend.first} {friend.last}</h1>
                                                </Link>
                                                </div>
                                        </div>
                                    )
                                )}
                            </div>}
                {friends.length ===0 && <div id="no-friends">
                                <h2 id="no-friends-text">You have no friends 😥</h2>
                            </div>}
            </div>
}