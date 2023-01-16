export default function friendsReducer(friends = null, action) {
    if (action.type == "friends/receivedFriends") {
        friends = action.payload.friends;
    }
    // if (action.type == "userinfo/madeHot") {
    //     console.log("Action Payload Made Hot: ", action.payload);
    //     userinfo = userinfo.map((user) => {
    //         if (user.id === action.payload.id) {
    //             return { ...user, hot: true };
    //         }
    //         return user;
    //     });
    // }
    // if (action.type == "userinfo/madeNot") {
    //     console.log("Action Payload Made Not: ", action.payload);
    //     userinfo = userinfo.map((user) => {
    //         if (user.id === action.payload.id) {
    //             return { ...user, hot: false };
    //         }
    //         return user;
    //     });
    // }
    return friends;
}

//______________________ACTIONS______________________________

export function receiveFriends(friends) {
    return {
        type: "friends/receivedFriends",
        payload: { friends },
    };
}
export function makeFriend(id) {
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