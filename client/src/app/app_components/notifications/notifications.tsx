import { useEffect, useState } from "react"
import "./notifications.css"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { FriendsState } from "../../redux/rootReducer";
import { Friend } from "../../interface";
import { friendsUpdated } from "../../redux/actions";

interface Notifications{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
}

export function Notifications() {
    const [notifications, setNotifications] = useState<Notifications []>([]);
    const [notificationsCount, setNotificationsCount] = useState<any>('');

    const state = useSelector<FriendsState, Friend[]>((state) =>state.friends);
    console.log('state! in notifications: ', state);

    const dispatch = useDispatch();
    useEffect(() => {
            fetch(`/friendss`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                dispatch(friendsUpdated(data.myFriends))
            })
            .catch(err => {
                    console.log('er in fetching friends: ', err);
                });
    }, [])
    // const dispatch = useDispatch();
//     useEffect(() => {
//         if(state.length === 0){
//             fetch(`/notifications`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 setNotificationsCount(data.notificationsCount)
//                 setNotifications(data.notificationsForMe)
//                 //both the count and notifications should be updated
//                 // dispatch(notificationsCount(data.notificationsCount))
                
//             })
//             .catch(err => {
//                     console.log('er in fetching notifications: ', err);
//                 });
//         }
// }, [])

    const [visibleNotifications, setVisibleNotifications] = useState<any>(false)
    const toggleNotifications = () => {
        setVisibleNotifications(!visibleNotifications);
        console.log('visibleNotifications', visibleNotifications);
    }
    
    return <div>
        <div id="div-bell-off">
            {!notificationsCount && <img src="/bell-off.png" alt="bell" id="notifications-off" />}
        </div>

        {notificationsCount >=1 && <div id="div-bell-on">
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