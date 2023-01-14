import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export function FriendRequestsButton() {
    let { id } = useParams();
    //getting the currect status of friendship
    const [friendRequsts, setFriendRequsts] = useState<any>({})
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
                console.log('checkfriendreq fetch3', data.friendReqs.rows[0]);
                setFriendRequsts( data.friendReqs.rows[0] )
            })
            .catch((error) => {
                console.error('Error caught in get checkfriendreq fetch:', error);
            });
    },[id])
    console.log('friendRequsts?', friendRequsts.accepted);

    // //canceling the reqest with DELETE
    // const [deleteFriendRequsts, setDeleteFriendRequsts] = useState({})
    // useEffect(()=>{
    //     fetch ('/deleteFriendshipReq', {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => 
    //             response.json())
    //         .then((data) => {
    //             console.log('deleteFriendshipReq fetch post', data);
    //             setDeleteFriendRequsts( data.DeletedFriendReqs )
    //         })
    //         .catch((error) => {
    //             console.error('Error caught in get checkfriendreq fetch:', error);
    //         });
    // },[])
    // console.log('deleteFriendRequsts', deleteFriendRequsts);
    
    return <div>
        {/* if nothing in db */}
        {!friendRequsts && <button>Send Friend Request 📨</button>}


        {/* if there is sth in db for these users but its false */}
        {friendRequsts.accepted === false && <button>Cancel Friend Request ❌</button>}


        {/* there is a true for these two users */}
        {friendRequsts.accepted === true && <button>Friends😊</button>}
    </div>
}