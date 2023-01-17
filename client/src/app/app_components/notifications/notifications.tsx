import { useEffect, useState } from "react"
import "./notifications.css"
import { BrowserRouter,Route, Link } from 'react-router-dom';
import { useSelector } from "react-redux";

interface Notifications{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
}

export function Notifications() {
    const [notifications, setNotifications] = useState<Notifications []>([]);
    const [notificationsCount, setNotificationsCount] = useState<any>('');

    const state = useSelector((state) => state);
    console.log('state!: ', state);
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
            setNotificationsCount(data.notificationsCount)
            setNotifications(data.notificationsForMe)
            //bothe the count and notifications should be updated
        })
        .catch(err => {
                console.log('er in fetching notifications: ', err);
            });
    }, [])

    const [visibleNotifications, setVisibleNotifications] = useState<any>(false)
    const toggleNotifications = () => {
        setVisibleNotifications(!visibleNotifications);
        console.log('visibleNotifications', visibleNotifications);
    }
    
    return <div>
        {/* onClick={toggleNotifications} */}
        <div id="div-bell-off">
            {!notificationsCount && <img src="/bell-off.png" alt="bell" id="notifications-off" />}
        </div>

        {notificationsCount >=1 && <div id="div-bell-on">
                                    {/* onClick={toggleNotifications} */}
                                    <img src="/bell-on.png" alt="bell" id="notifications-on" onClick={toggleNotifications}/>
                                    <h6 id="notificationsCount">{notificationsCount}</h6>
                                </div>}
        {visibleNotifications && <div id="triangle-div">
                                    <div id="triangle"></div>
                                </div>}
        {visibleNotifications &&
            <div id="actual-notifications">
                <h1 id="notifications">Notifications</h1>
                {notifications.map(oneNotification => (
                                <div key={oneNotification.id} >
                                            <div id="actual-notifications-div">
                                                    <img src={oneNotification.profile_pic_url} alt={oneNotification.first} 
                                                    id='actual-notifications-img'/>
                                                    <Link to={`/user/${oneNotification.id}`} id="link-decoration-none">
                                                        <h1 id='actual-notifications-text'>{oneNotification.first} {oneNotification.last}</h1>
                                                    </Link>
                                            </div>
                                </div>
                        )
                    )}
            </div> }
    </div>
}