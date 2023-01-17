export default function friendsReducer(friends = [], action) {
    if (action.type == "friends/receivedFriends") {
        friends = action.payload.friends;
    }
    console.log('action.payload in slice: ', action.payload);

    if (action.type == "friends/accept") {
        console.log("Action Payload.id in slice: ", action.payload.id);
        console.log("friends in slice: ", friends);
        friends = friends.map((friend) => {
            console.log('1 friend also in slice: ', friend);
            if (friend.id === action.payload.id.id) {
                return { ...friend, accepted: true };
            }
            return friend;
        });
    }

    return friends;
}

//______________________ACTIONS______________________________

export function receiveFriends(friends) {
    console.log('friends in receive Friends', friends);
    return {
        type: "friends/receivedFriends",
        payload: { friends },
    };
}
export function makeFriend(id) {
    console.log("id in accept action ", id);
    return {
        type: "friends/accept",
        payload: { id },
    };
}
// export function unfriend(id) {
//     return {
//         type: "friends/unfriend",
//         payload: { id },
//     };
// }