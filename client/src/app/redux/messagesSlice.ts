import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../interface";

export interface FriendsState {
    messagesValue: Message[];
}
const initialState: FriendsState = {
    messagesValue: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesState: (state, messagesAction: PayloadAction<Message[]>) => {//action instructs how to change
      console.log('fp in messages', messagesAction.payload);
      state.messagesValue = messagesAction.payload;
    },
    receivedMessage: (state, messagesAction: PayloadAction<number>) => {
        console.log('messagesAction received: ', messagesAction);
        console.log('state.messagesValue: ', state.messagesValue);
        // return [...messages, messagesAction.payload.message];
    }
  },
});

export const { messagesState, receivedMessage,} = messagesSlice.actions // Action
export default messagesSlice.reducer //reducer