export interface FriendsState {
    friends: Friend[];
}

export interface Friend {
    fid: Number;
    sender_id: Number;
    recipient_id: Number;
    accepted: Boolean;
    timestamp: Number;
    first: String;
    last: String;
    email: String;
    profile_pic_url: String;
    bio: String;
    password: String;
    created_at: String;
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
        const unfriend = state.friends.map((friend) => {
            console.log('fid', friend.fid);
            console.log('fid a', action.payload.id);
        const remove = state.friends.findIndex((el)=>{
            el.fid === friend.fid;
        })
        let newStateOfFriends = state.friends;
            if (friend.fid === action.payload.id) {//6 === 6
                return newStateOfFriends.splice(remove, 1);
            }
            return newStateOfFriends;
        });
        return {
            ...state,
            friends: unfriend,
        };
        
    }
    return state;
}
