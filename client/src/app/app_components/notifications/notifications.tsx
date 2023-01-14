import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "./notifications.css"

export function Notifications() {
    let { id } = useParams();
    const [notifications, setNotifications] = useState('');
    //fetch the info of friend_requests
    useEffect(() => {
        fetch(`/notifications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('data notifications: ', data);
            
        })
        .catch(err => {
                console.log('er in fetching notifications: ', err);
            });
    })
    
    return <div>
        {!notifications && <img src="/bell-off.png" alt="bell" id="notifications-off" />}
        {/* onClick={toggleNotifications} */}
        {notifications && <img src="/bell-on.png" alt="bell" id="notifications-on" /> }
        {/* onClick={toggleNotifications} */}
    </div>
}