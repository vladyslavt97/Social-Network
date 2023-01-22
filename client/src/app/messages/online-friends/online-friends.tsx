import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import './online-friends.css'
import {selectedFriendId} from '../../redux/messagesSlice';

interface OnlineFriendsProps{
    toggleRelevantMessage: React.MouseEventHandler<HTMLDivElement>
    counterpartChosen: boolean
}

export default function OnlineFriends(props: OnlineFriendsProps) {
    const dispatch = useDispatch();
    const clickedFriendId = useSelector((state: RootState) => state.messages.id);

  const friends = useSelector((state: RootState) => state.friends.value.filter((el)=>{
       return el.accepted;
    }));

  return (
    <div id='other-messages-div'>
        <h2 id='friends-who-are-online'>Chat to your friends</h2>
        {friends.length === 0 && <h1 id='no-messages'>You have not started a chat yet!</h1>}
        {friends.length !== 0 && <div id='online-friends-list>'>
                                    {friends.map(friend => (
                                        <div key={friend.id} onClick={()=>dispatch(selectedFriendId(friend.id))}>
                                            <div 
                                            key={friend.id} 
                                            onClick={props.toggleRelevantMessage} 
                                            className={`${friend.id === clickedFriendId && 
                                                props.counterpartChosen ? 'online-friends-selected' : 'online-friends'}`}>
                                                <img src={friend.profile_pic_url} alt={friend.first} 
                                                id='online-friends-img'/>
                                                <h1 id='online-friends-name'>{friend.first} {friend.last}</h1>
                                            </div>
                                        </div>
                                        )
                                    )}
                                </div>
        }        
  </div>
  )
}
