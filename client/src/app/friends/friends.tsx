import { useEffect, useState } from "react"
import "./friends.css"
import { friendsUpdated } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Friend, FriendsState } from "../redux/rootReducer";
import TrueFriends from "./TrueFriends/TrueFriends";
import NotFriends from "./NotFriends/NotFriends";

export function Friends (){
    const friendS = useSelector<FriendsState, Friend[]>((state) => state.friends);
    // const friendS = useSelector<FriendsState, Friend[]>((state) => state.friends);
    console.log('friendS!: ', friendS);
    
    const [friends, setFriends] = useState([]);
    // const [friends, setFriends] = useState<Friends []>([]);
    const [wannabees, setWannabeees] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
    if (friendS.length === 0){
        fetch(`/friendss`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('data.myFriends: ', data.myFriends);
            
            const trueFriends = data.myFriends.filter((el: any) => 
                    el.accepted !== false);
            console.log('trueFriends', trueFriends);
            setFriends(trueFriends)
            
            const notFriends = data.myFriends.filter((el: any) => 
                    el.accepted !== true);
            console.log('trueFriends', notFriends);
            setWannabeees(notFriends);
            dispatch(friendsUpdated(data.myFriends))

        })
        .catch(err => {
                console.log('er in fetching friends: ', err);
            });
    } else {
            setFriends(friendS)
            setWannabeees(friendS);
            // dispatch(friendsUpdated(friendS))
        }
    }, [])

    return <div>
                <div id="allfriends-and-wannabees">
                    <TrueFriends friends={friends}/>
                    <div id="separating-line"></div>
                    <NotFriends wannabees={wannabees}/>
                </div>
            </div>
}