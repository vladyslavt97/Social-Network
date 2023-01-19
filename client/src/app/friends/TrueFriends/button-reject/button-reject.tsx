import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {unfriend} from '../../../redux/friendsSlice';
interface ButtonRejectFrienshipProps{
    id: number,
}

export default function ButtonRejectFrienship(props: ButtonRejectFrienshipProps) {
    const [deleteButton, setDeleteButton] = useState(false);
    const dispatch = useDispatch();
    const handleDelete = () => {
        setDeleteButton(true);
    }
    useEffect(()=>{
        if(deleteButton){
            console.log('1st id: ', props.id);
            
        fetch (`/deletefriendshipreq/${props.id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('deleteFriendshipReq in Button Reject fetch post', data.deletedFriendReqs[0] );
                dispatch(unfriend(data.deletedFriendReqs[0]));
            })
            .catch((error) => {
                console.error('Error caught in deleteFriendshipReq fetch:', error);
            });
        }
    },[deleteButton])
  return (
    <div>
        <button onClick={handleDelete}>reject</button>
    </div>
  )
}

