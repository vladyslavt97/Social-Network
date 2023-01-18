import { Friend } from "../interface";

export interface FriendsState {
    friends: Friend[];
}

type Action = {
    type: String;
    payload: any;
};

const initialState: FriendsState = {
    friends: [],
};

export default function friendsReducer(state = initialState, action: Action) {
    console.log("ap: ", action.payload);

    if (action.type === "friendsUpdated") {
        return {
            ...state,
            friends: action.payload,
        };
    }
    if (action.type === "makefriend") {
        const newFriends = state.friends.map((friend) => {
            if (friend.fid === action.payload.id) {
                return {
                    ...friend,
                    accepted: true,
                };
            }
            return friend;
        });
        return {
            ...state,
            friends: newFriends,
        };
    }
    if (action.type === "unfriend") {
        console.log('got heeerer');
        let filtered = state.friends.filter((el)=>{
            return el.fid !== action.payload.id;
        });
        return {
            ...state,
            friends: filtered,
        };
        
    }
    return state;
}
