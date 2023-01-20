import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { acceptFriend } from '../../../redux/friendsSlice';

interface ButtonAcceptFriendshipProps{
    id: number,
}
export default function ButtonAcceptFriendship(props: ButtonAcceptFriendshipProps) {
    const [updateButton, setUpdateButton] = useState(false);
    const dispatch = useDispatch();
    const handleUpdate = () => {
        setUpdateButton(true);
    }
    useEffect(()=>{
        if(updateButton){
            console.log('4th');
        fetch (`/updatefriendshipreq/${props.id}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('updateFriendshipReq fetch post', data.updatedFriendReqs.rows[0].id );
                setUpdateButton(false);
                dispatch(acceptFriend(data.updatedFriendReqs.rows[0].id));
            })
            .catch((error) => {
                console.error('Error caught in get deleteFriendshipReq fetch:', error);
            });
        }
    },[updateButton])
  return (
    <div>
        <button onClick={handleUpdate}>Accept</button>
    </div>
  )
}
