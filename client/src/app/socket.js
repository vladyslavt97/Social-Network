import { io } from "socket.io-client";
import { messagesState, receivedMessage} from "./redux/messagesSlice";

// as soon as redux is setup - it has to talk to REDUX ! ! ! and update its state!
// new message comes in -> update redux -> my component is subscribing to this part of the redux

export let socket;
export const initSocket = (store) => {//needs to update teh store
    console.log("initSocket");
    if (socket) {//you already set up the socket 
        return;
    }

    socket = io.connect();// using their library - connet to the server

    // I receive a list of messages (probably at the beginning)
    socket.on("chatMessages", (data) => {
        const action = messagesState(data.messages);
        store.dispatch(action);
    });

    // I receive a single message when someone has sent it to the server
    socket.on("chatMessage", (data) => {
        const action = receivedMessage(data.message);
        store.dispatch(action);
    });
};