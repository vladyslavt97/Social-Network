import { useEffect, useState } from "react"
import "./friends.css"
import { friendsUpdated, makeFriend } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Friend, FriendsState } from "../redux/rootReducer";
import TrueFriends from "./TrueFriends/TrueFriends";
import NotFriends from "./NotFriends/NotFriends";

export function Friends (){
    const friendS = useSelector<FriendsState, Friend[]>((state) => state.friends);
    const friendTrue = useSelector<FriendsState, Friend[]>((state) => state.friends.filter((el)=>{
       return el.accepted;
    }));

    const friendFalse = useSelector<FriendsState, Friend[]>((state) => state.friends.filter((el)=>{
        return !el.accepted;
    }));

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
            const trueFriends = data.myFriends.filter((el: any) => 
                    el.accepted !== false);
            setFriends(trueFriends)
            
            const notFriends = data.myFriends.filter((el: any) => 
                    el.accepted !== true);
            setWannabeees(notFriends);
            dispatch(friendsUpdated(data.myFriends))

        })
        .catch(err => {
                console.log('er in fetching friends: ', err);
            });
    } else {
            setFriends(friendTrue);
            setWannabeees(friendFalse);
        }
    }, [friendS])

    return <div>
                <div id="allfriends-and-wannabees">
                    <TrueFriends friends={friends}/>
                    <div id="separating-line"></div>
                    <NotFriends wannabees={wannabees}/>
                </div>
            </div>
}