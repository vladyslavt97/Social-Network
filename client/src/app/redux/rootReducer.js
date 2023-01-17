const initialState = {
    friends: []
};

export default function friendsReducer(state = initialState, action) {
    if (action.type === "friendsUpdated") {
        return {
            ...state,
            friends: action.payload
        };
    }
    return state;
}