import React, { useEffect, useState } from 'react'

interface ButtonRejectFrienshipProps{
    id: number,
}

export default function ButtonRejectFrienship(props: ButtonRejectFrienshipProps) {
    //DELETE
    const [deleteButton, setDeleteButton] = useState(false);

    const handleDelete = () => {
        setDeleteButton(true);
    }
    useEffect(()=>{
        if(deleteButton){
            console.log('1st');
            
        fetch (`/deletefriendshipreq/${props.id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('deleteFriendshipReq fetch post', data.deletedFriendReqs.rows[0] );
                
            })
            .catch((error) => {
                console.error('Error caught in get deleteFriendshipReq fetch:', error);
            });
        }
    },[deleteButton])
  return (
    <div>
        <button onClick={handleDelete}>reject</button>
    </div>
  )
}
