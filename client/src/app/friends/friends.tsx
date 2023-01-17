import { useEffect, useState } from "react"
import "./friends.css"
import { Link } from 'react-router-dom';
import { friendsUpdated } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ButtonAcceptFriendship from "./button-accept/button-accept";
import ButtonRejectFrienship from "./button-reject/button-reject";
import { Friend, FriendsState } from "../redux/rootReducer";

// interface Friends{
//     id: number,
//     first: string,
//     last: string,
//     profile_pic_url: string,
//     email: string
// }

export function Friends (){
    const friendS = useSelector<FriendsState, Friend[]>((state) => state.friends);
    // const friendS = useSelector<FriendsState, Friend[]>((state) => state.friends);
    console.log('friendS!: ', friendS);
    
    const [friends, setFriends] = useState([]);
    // const [friends, setFriends] = useState<Friends []>([]);
    const [wannabees, setWannabeees] = useState([]);
    const dispatch = useDispatch();
    //fetch the info of friend_requests
    useEffect(() => {
    if (friendS.length === 0){
        fetch(`/friendss`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('data.myFriends: ', data.myFriends);
            
            const trueFriends = data.myFriends.filter((el: any) => 
                    el.accepted !== false);
            console.log('trueFriends', trueFriends);
            setFriends(trueFriends)
            
            const notFriends = data.myFriends.filter((el: any) => 
                    el.accepted !== true);
            console.log('trueFriends', notFriends);
            setWannabeees(notFriends);
            dispatch(friendsUpdated(data.myFriends))

        })
        .catch(err => {
                console.log('er in fetching friends: ', err);
            });
    } else {
            setFriends(friendS)
            setWannabeees(friendS);
            dispatch(friendsUpdated(friendS))
        }
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