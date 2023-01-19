import "./friends.css"
import { useSelector } from "react-redux";
import TrueFriends from "./TrueFriends/TrueFriends";
import NotFriends from "./NotFriends/NotFriends";
import { RootState } from "../redux/store";


export function Friends (){
    const friends = useSelector((state: RootState) => state.friends.value.filter((el)=>{
       return el.accepted;
    }));
    const wannabees = useSelector((state: RootState) => state.friends.value.filter((el)=>{
        return !el.accepted;
    }));
    console.log('friendssss', friends);
    
    return <div>
                <div id="allfriends-and-wannabees">
                    <TrueFriends friends={friends}/>
                    <div id="separating-line"></div>
                    <NotFriends wannabees={wannabees}/>
                </div>
            </div>
}