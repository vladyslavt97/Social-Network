import { useEffect, useState } from "react"

export function FriendRequestsButton() {
    //getting the currect status of friendship
    const [friendRequsts, setFriendRequsts] = useState({})
    useEffect(()=>{
        fetch ('checkfriendreq', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('checkfriendreq fetch', data);
                setFriendRequsts( data.friendReqs )
            })
            .catch((error) => {
                console.error('Error caught in get checkfriendreq fetch:', error);
            });
    },[])
    console.log('friendRequsts?', friendRequsts);

    //canceling the reqest with DELETE
    const [deleteFriendRequsts, setDeleteFriendRequsts] = useState({})
    useEffect(()=>{
        fetch ('/deleteFriendshipReq', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => 
                response.json())
            .then((data) => {
                console.log('deleteFriendshipReq fetch post', data);
                setDeleteFriendRequsts( data.DeletedFriendReqs )
            })
            .catch((error) => {
                console.error('Error caught in get checkfriendreq fetch:', error);
            });
    },[])
    console.log('deleteFriendRequsts', deleteFriendRequsts);
    
    return <div>
        {/* if nothing in db */}
        {<button>Send Friend Request📨</button>}


        {/* if there is sth in db for these users but its false */}
        {<button>Cancel Friend Request❌</button>}


        {/* there is a true for these two users */}
        {<button>Friends😊</button>}
    </div>
}