import React, { useEffect, useState } from 'react'

interface ButtonAcceptFriendshipProps{
    id: number,
}

export default function ButtonAcceptFriendship(props: ButtonAcceptFriendshipProps) {
    const [updateButton, setUpdateButton] = useState(false);
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
                console.log('updateFriendshipReq fetch post', data.updatedFriendReqs.rows[0] );
                // setFriendRequsts( data.updatedFriendReqs.rows[0] )
                setUpdateButton(false);
                // dispatch(makeFriend(data.updatedFriendReqs.rows[0]));

                // updateNotificationInApp()
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
