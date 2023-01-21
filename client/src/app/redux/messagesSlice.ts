import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../interface";

export interface FriendsState {
    messagesValue: Message[];
    id: number
}
const initialState: FriendsState = {
    messagesValue: [],
    id: 0,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messagesState: (state, messagesAction: PayloadAction<Message[]>) => {//action instructs how to change
      console.log('fp in messages', messagesAction.payload);
      state.messagesValue = messagesAction.payload;
    },
    receivedMessage: (state, messagesAction: PayloadAction<Message>) => {
        console.log('messagesAction received: ', messagesAction.payload);
        console.log('state.messagesValue: ', state.messagesValue);
        state.messagesValue.unshift(messagesAction.payload);
    },
    selectedFriendId: (state, messagesAction: PayloadAction<number>) => {
      console.log('messagesAction.payload state,id', messagesAction.payload);
      state.id = messagesAction.payload;
    }
  },
});

export const { messagesState, receivedMessage, selectedFriendId} = messagesSlice.actions // Action
export default messagesSlice.reducer //reducer