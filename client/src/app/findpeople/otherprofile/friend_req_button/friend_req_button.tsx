import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export function FriendRequestsButton() {
    let { id } = useParams();
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
                setFriendRequsts( data.friendReqs.rows[0] )
                setThisReqIsForMe(data.foundMyself)
            })
            .catch((error) => {
                console.error('Error caught in get checkfriendreq fetch:', error);
            });
    },[])
    // console.log('friendRequsts?', friendRequsts.accepted);
    console.log('thisReqIsForMe?', thisReqIsForMe);

    //insert
    const [insertButton, setInsertButton] = useState(false);
    const handleClick = () => {
        setInsertButton(true);
    }

    const [insertedFriendRequsts, setinsertedFriendRequsts] = useState<any>({})
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
                    setinsertedFriendRequsts( data.insertedFriendReq.rows[0])
                    setFriendRequsts( data.insertedFriendReq.rows[0])
                    setDeleteButton(false);
                })
                .catch((error) => {
                    console.error('Error caught in post insertedFriendReq fetch:', error);
                });
        }
    },[insertButton])
    // console.log('friendRequsts?', insertedFriendRequsts.accepted);

    //canceling the reqest with DELETE
    const [deleteButton, setDeleteButton] = useState(false);

    const handleDelete = () => {
        setDeleteButton(true);
    }
    const [deleteFriendRequsts, setDeleteFriendRequsts] = useState({})
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
                console.log('deleteFriendshipReq fetch post', data.deletedFriendReqs[0] );
                setDeleteFriendRequsts( data.deletedFriendReqs[0] )
                setFriendRequsts( data.deletedFriendReqs[0] )
                setInsertButton(false);
            })
            .catch((error) => {
                console.error('Error caught in get deleteFriendshipReq fetch:', error);
            });
        }
    },[deleteButton])
    console.log('deleteFriendRequsts', deleteFriendRequsts);
    //update the reqest
    const [updateButton, setUpdateButton] = useState(false);

    const handleUpdate = () => {
        setUpdateButton(true);
    }
    const [updateFriendRequsts, setUpdateFriendRequsts] = useState({})
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
                console.log('deleteFriendshipReq fetch post', data.updatedFriendReqs[0] );
                setUpdateFriendRequsts( data.updatedFriendReqs[0] )
                setFriendRequsts( data.updatedFriendReqs[0] )
                setUpdateButton(false);
            })
            .catch((error) => {
                console.error('Error caught in get deleteFriendshipReq fetch:', error);
            });
        }
    },[updateButton])
    console.log('updateFriendRequsts', updateFriendRequsts);
    
    return <div>
        {/* if nothing in db */}
        {!friendRequsts && <button onClick={handleClick}>Send Friend Request 📨</button>}


        {/* if there is sth in db for these users but its false */}
        {friendRequsts?.accepted === false && !thisReqIsForMe && <button onClick={handleDelete}>Cancel Friend Request ❌</button>}


        {/* if my id is matching with the id of the recepinet, and the id of the sender is a match as well with params */}
        {friendRequsts?.accepted === false && thisReqIsForMe && <button onClick={handleUpdate}>Accept friendship ✅</button>}

        {/* there is a true for these two users */}
        {friendRequsts?.accepted === true && <button>Unfriend 💔</button>}
    </div>
}