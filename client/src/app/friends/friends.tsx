import { useEffect, useState } from "react"
import "./friends.css"

interface Friends{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
    email: string
}

export function Friends (){
    const [friends, setFriends] = useState<Friends []>([]);

    //fetch the info of friend_requests
    useEffect(() => {
        fetch(`/friends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFriends(data.myFriends)
        })
        .catch(err => {
                console.log('er in fetching friends: ', err);
            });
    }, [friends])

    return <div>
                <h2 id="friedns">Friends</h2>
                <div id="big-friends-div">
                {friends.map(friend => (
                            <div key={friend.id} >
                                    {/* <Link to={`/user/${friend.id}`} > */}
                                    <div id="friends-div">
                                        <img src={friend.profile_pic_url} alt={friend.first} 
                                        id='friends-img'/>
                                        <h1 id='friends-text'>{friend.first} {friend.last}</h1>
                                    {/* </Link> */}
                                    </div>
                            </div>
                        )
                    )}
                </div>
            </div>
}