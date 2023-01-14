import { useEffect, useState } from "react"
import "./notifications.css"
import { Link } from 'react-router-dom';

interface Notifications{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
}

export function Notifications() {
    const [notifications, setNotifications] = useState<Notifications []>([]);
    const [notificationsCount, setNotificationsCount] = useState<any>('');

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
            setNotificationsCount(data.notificationsCount)
            setNotifications(data.notificationsForMe)
        })
        .catch(err => {
                console.log('er in fetching notifications: ', err);
            });
    }, [])

    const [visibleNotifications, setVisibleNotifications] = useState<any>()
    const toggleNotifications = () => {
        setVisibleNotifications(!visibleNotifications);
    }
    
    return <div>
        {/* onClick={toggleNotifications} */}
        <div id="div-bell-off">
            {!notificationsCount && <img src="/bell-off.png" alt="bell" id="notifications-off" />}
        </div>

        <div id="div-bell-on">
            {/* onClick={toggleNotifications} */}
            {notificationsCount && <img src="/bell-on.png" alt="bell" id="notifications-on" onClick={toggleNotifications}/> }
            {notificationsCount && <h6 id="notificationsCount">{notificationsCount}</h6>}
        </div>
        {visibleNotifications &&
            <div id="actual-notifications">
                <h1 id="notifications">Notifications</h1>
                {notifications.map(oneNotification => (
                                <div key={oneNotification.id} >
                                    <div id="actual-notifications-div">
                                        {/* <Link to={`/user/${oneNotification.id}`} > */}
                                            <img src={oneNotification.profile_pic_url} alt={oneNotification.first} 
                                            id='actual-notifications-img'/>
                                            <h1 id='actual-notifications-text'>{oneNotification.first} {oneNotification.last}</h1>
                                        {/* </Link> */}
                                    </div>
                                </div>
                        )
                    )}
            </div> }
    </div>
}