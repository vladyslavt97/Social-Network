interface FriendsState {
    friends: Friend[]
}

interface Friend {
    id: Number,
    sender_id: Number,
    recipient_id: Number,
    accepted: Boolean
    timestamp: Number,
    first: String,
    last: String,
    email: String,
    profile_pic_url: String,
    bio: String,
    password: String,
    created_at: String,
}

type Action = {
    type: String,
    payload: unknown,
}


const initialState: FriendsState = {
    friends: []
}

export default function friendsReducer(state = initialState, action: Action) {
    if (action.type === "friendsUpdated") {
        return {
            ...state,
            friends: action.payload
        };
    }
    return state;
}