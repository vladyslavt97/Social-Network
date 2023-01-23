import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store"
import "./onlineusers.css"

export function OnlineUsers (){
    const onlineUsers = useSelector((state: RootState)=> state.messages.onlineUser);
    // console.log('onlineUSers', onlineUsers);
    
    const [visibleListOfOnlineUsers, setVisibleListOfOnlineUsers] = useState<boolean>(false)
    const toggleOnlineUsers = () => {
            setVisibleListOfOnlineUsers(!visibleListOfOnlineUsers);
        }

    return <div>
                {visibleListOfOnlineUsers && <div id="backdrop-inonline" onClick={toggleOnlineUsers}></div>}
                <div id="onlineusers-toggle" onClick={toggleOnlineUsers}>
                    <img src="/arrow-onlineusers.png" alt="onlineusers" id="arrow-onlineusers-img"/>
                    <div id="arrow-text-onlineusers">
                        <h5>🟢 </h5><h5 id="arrow-text-onlineusers-button">&nbsp; online users</h5>
                    </div>
                </div>

                {visibleListOfOnlineUsers && <div id="online-users-bar">
                                                {onlineUsers.length === 0 ? <h4>No one is online.</h4>:
                                                <div> 
                                                    {onlineUsers.map(u => (
                                                        <div key={u.id} >
                                                            <div id="actual-notifications-div">
                                                                    <img src={u.profile_pic_url} alt={u.first} 
                                                                    id='actual-notifications-img'/>
                                                                    <Link to={`/user/${u.id}`} id="link-decoration-none">
                                                                        <h1 id='actual-notifications-text'>{u.first} {u.last}</h1>
                                                                    </Link>
                                                            </div>
                                                        </div>
                        )
                    )}
                                                </div>}
                                            </div>}
            </div>
}