import { useEffect, useState } from "react"
import "./friends.css"
import { friendsUpdated, makeFriend } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Friend, FriendsState } from "../redux/rootReducer";
import TrueFriends from "./TrueFriends/TrueFriends";
import NotFriends from "./NotFriends/NotFriends";

export function Friends (){
    const friendS = useSelector<FriendsState, Friend[]>((state) => state.friends);
    console.log('friendS', friendS);
    
    const friends = useSelector<FriendsState, Friend[]>((state) => state.friends.filter((el)=>{
       return el.accepted;
    }));

    const wannabees = useSelector<FriendsState, Friend[]>((state) => state.friends.filter((el)=>{
        return !el.accepted;
    }));

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

    return <div>
                <div id="allfriends-and-wannabees">
                    <TrueFriends friends={friends}/>
                    <div id="separating-line"></div>
                    <NotFriends wannabees={wannabees}/>
                </div>
            </div>
}