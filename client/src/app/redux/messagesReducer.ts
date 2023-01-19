import { Message, Action } from "../interface";

interface MessagesState {
    messages: Message[];
}

const initialState: MessagesState = {
    messages: [],
};

export default function messagesReducer(messages = initialState, action: Action) {
    switch (action.type) {
        case "/messages/recent-received":
            return action.payload.messages;
        case "/messages/single-received":
            // return [...messages, action.payload.message];
        default:
            return messages;
    }
}
