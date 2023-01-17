import { useEffect, useState } from "react"
import "./onlineusers.css"

export function OnlineUsers (){

    const [visibleListOfOnlineUsers, setVisibleListOfOnlineUsers] = useState<boolean>(false)
    const toggleOnlineUsers = () => {
            setVisibleListOfOnlineUsers(!visibleListOfOnlineUsers);
        }

    return <div>
                <div id="onlineusers-toggle" onClick={toggleOnlineUsers}>
                    <img src="/arrow-onlineusers.png" alt="onlineusers" id="arrow-onlineusers-img"/>
                    <div id="arrow-text-onlineusers">
                        <h5>🟢 </h5><h5 id="arrow-text-onlineusers-button">&nbsp; online users</h5>
                    </div>
                </div>

                {visibleListOfOnlineUsers && <div id="online-users-bar">
                                                <h4>No one is online.</h4>
                                            </div>}
            </div>
}