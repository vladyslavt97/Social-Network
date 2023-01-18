import { useEffect} from "react"
import "./friends.css"
import { friendsUpdated} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Friend } from "../interface"
import TrueFriends from "./TrueFriends/TrueFriends";
import NotFriends from "./NotFriends/NotFriends";
import { FriendsState } from "../redux/rootReducer";

export function Friends (){
    const friends = useSelector<FriendsState, Friend[]>((state) => state.friends.filter((el)=>{
       return el.accepted;
    }));
    const wannabees = useSelector<FriendsState, Friend[]>((state) => state.friends.filter((el)=>{
        return !el.accepted;
    }));

    return <div>
                <div id="allfriends-and-wannabees">
                    <TrueFriends friends={friends}/>
                    <div id="separating-line"></div>
                    <NotFriends wannabees={wannabees}/>
                </div>
            </div>
}