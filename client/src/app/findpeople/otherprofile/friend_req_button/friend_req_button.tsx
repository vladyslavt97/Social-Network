import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
// import { makeFriend } from "../../../redux/old/friends/slice.js";

export function FriendRequestsButton() {
    let { id } = useParams();
    const state = useSelector((state) => state);
    console.log('state in btn!: ', state);

    //getting the currect status of friendship
    const [friendRequsts, setFriendRequsts] = useState<any>({})
    const [thisReqIsForMe, setThisReqIsForMe] = useState<any>({})

    useEffect(()=>{
        fetch (`/checkfriendreq/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('data',data);
                console.log('setFriendRequsts',data.friendReqs.rows[0]);
                setFriendRequsts( data.friendReqs.rows[0] )
                console.log('setThisReqIsForMe', data.foundMyself);
                setThisReqIsForMe(data.foundMyself)
            })
            .catch((error) => {
                console.error('Error caught in get checkfriendreq fetch:', error);
            });
    },[])


    //insert
    const [insertButton, setInsertButton] = useState(false);
    const handleClick = () => {
        setInsertButton(true);
    }

    useEffect(()=>{
        if(insertButton){
            fetch (`/insertfriendreq/${id}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => 
                    response.json())
                .then((data) => {
                    console.log('insertedFriendReq fetch2', data.insertedFriendReq.rows[0]);
                    setFriendRequsts( data.insertedFriendReq.rows[0])
                    setDeleteButton(false);
                    
                })
                .catch((error) => {
                    console.error('Error caught in post insertedFriendReq fetch:', error);
                });
        }
    },[insertButton])

    //DELETE
    const [deleteButton, setDeleteButton] = useState(false);

    const handleDelete = () => {
        setDeleteButton(true);
    }
    useEffect(()=>{
        if(deleteButton){
            console.log('1st');
            
        fetch (`/deletefriendshipreq/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('deleteFriendshipReq fetch post', data.deletedFriendReqs.rows[0] );
                setFriendRequsts( data.deletedFriendReqs.rows[0] )
                setThisReqIsForMe( data.deletedFriendReqs.rows[0])
                setInsertButton(false);
                
            })
            .catch((error) => {
                console.error('Error caught in get deleteFriendshipReq fetch:', error);
            });
        }
    },[deleteButton])


    //update
    const dispatch = useDispatch();

    const [updateButton, setUpdateButton] = useState(false);
    const handleUpdate = () => {
        setUpdateButton(true);
    }
    useEffect(()=>{
        if(updateButton){
            console.log('4th');
        fetch (`/updatefriendshipreq/${id}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('updateFriendshipReq fetch post', data.updatedFriendReqs.rows[0] );
                setFriendRequsts( data.updatedFriendReqs.rows[0] )
                setUpdateButton(false);
                // dispatch(makeFriend(data.updatedFriendReqs.rows[0]));
            })
            .catch((error) => {
                console.error('Error caught in get deleteFriendshipReq fetch:', error);
            });
        }
    },[updateButton])
    
    const state1 = useSelector((state) => state);
    console.log('state in btn123!: ', state1);

    return <div>
        {/* if nothing in db */}
        {!friendRequsts && <button onClick={handleClick}>Send Friend Request 📨</button>}
        {/* if there is sth in db for these users but its false */}
        {friendRequsts?.accepted === false && !thisReqIsForMe && <button onClick={handleDelete}>Cancel Friend Request ❌</button>}
        {/* if my id is matching with the id of the recepinet, and the id of the sender is a match as well with params */}
        {friendRequsts?.accepted === false && thisReqIsForMe && <button onClick={handleUpdate}>Accept friendship ✅</button>}
        {/* there is a true for these two users */}
        {friendRequsts?.accepted === true && <button onClick={handleDelete}>Unfriend 💔</button>}
        {/* <Notifications friendRequsts={friendRequsts}/> */}
    </div>
}