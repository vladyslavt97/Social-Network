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

    socket.on('online', (data) => {
        
    })

    socket = io.connect();// using their library - connet to the server
    // console.log('just a lo');
    // I receive a list of messages (probably at the beginning)
    socket.on("chatMessages", (data) => {
        console.log('Messages data in socket.js', data);

        // console.log('here we get the messages from the server to socket.js', data.rows);
        const action = messagesState(data.rows);//messages
        store.dispatch(action);
    });

    // I receive a single message when someone has sent it to the server
    socket.on("private_message", (data) => {
        console.log('data in the sokcet.js is from textarea.tsx with .to', data);
        const action = receivedMessage(data.info);//message
        store.dispatch(action);
    });
};