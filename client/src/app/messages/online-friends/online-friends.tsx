import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import './online-friends.css'

interface OnlineFriendsProps{
    toggleRelevantMessage: React.MouseEventHandler<HTMLDivElement>
}

export default function OnlineFriends(props: OnlineFriendsProps) {
  const friends = useSelector((state: RootState) => state.friends.value.filter((el)=>{
       return el.accepted;
    }));


  return (
    <div id='other-messages-div'>
        <h2 id='friends-who-are-online'>Friends who are online</h2>
        {friends.length === 0 && <h1 id='no-messages'>there are no messages for you!</h1>}
        {friends.length !== 0 && <div id='online-friends-list>'>
                                    {friends.map(friend => (
                                        <div key={friend.id} >
                                            <div id="online-friends" onClick={props.toggleRelevantMessage}>
                                            {/* <Link to={`/user/${friend.id}`} id="link-decoration-none"> */}
                                                <img src={friend.profile_pic_url} alt={friend.first} 
                                                id='online-friends-img'/>
                                                <h1 id='online-friends-name'>{friend.first} {friend.last}</h1>
                                            {/* </Link> */}
                                            </div>
                                        </div>
                                        )
                                    )}
                                </div>
        }
  </div>
  )
}
