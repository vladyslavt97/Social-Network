import { useEffect, useState } from "react"
import "./notifications.css"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { friendsState } from "../../redux/friendsSlice";

interface Notifications{
    id: number,
    first: string,
    last: string,
    profile_pic_url: string,
}

export function Notifications() {
    
    const notifications = useSelector((state: RootState) =>state.friends.value.filter(el=>{
        return !el.accepted;
    }));
    const notificationsCount = notifications.length;

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
                dispatch(friendsState(data.myFriends))
            })
            .catch(err => {
                    console.log('er in fetching friends: ', err);
                });
    }, [])

    const [visibleNotifications, setVisibleNotifications] = useState<any>(false)
    const toggleNotifications = () => {
        setVisibleNotifications(!visibleNotifications);
    }
    
    return <div>
        {visibleNotifications && <div id="backdrop-in-notifications" onClick={toggleNotifications}></div>}

        <div id="div-bell-off">
            {!notificationsCount && <img src="/bell-off.png" alt="bell" id="notifications-off" />}
        </div>

        {notificationsCount >=1 && <div id="div-bell-on">
                                    <img src="/bell-on.png" alt="bell" id="notifications-on" onClick={toggleNotifications}/>
                                    {notificationsCount <= 9 ? <h6 id="notificationsCount">{notificationsCount}</h6> :
                                    notificationsCount > 9 && <h6 id="notificationsCountMax">9+</h6>}
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