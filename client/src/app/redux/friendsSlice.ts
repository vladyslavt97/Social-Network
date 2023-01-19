import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Friend, Action } from "../interface";

export interface FriendsState {
    value: Friend[];
}

const initialState: FriendsState = {
    value: [],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    friendsState: (state, friendsAction: PayloadAction<Friend[]>) => {
      state.value = friendsAction.payload;
    },
    acceptFriend: (state, friendsAction: PayloadAction<number>) => {
      const foundFriend = state.value.findIndex(friend => friend.fid === friendsAction.payload);
          state.value[foundFriend].accepted = true;
    },
    unfriend: (state, friendsAction: PayloadAction<number>) => {
      const unfriendedFriend = state.value.findIndex(el=> el.fid !== friendsAction.payload);
        state.value.splice(unfriendedFriend, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { friendsState, acceptFriend, unfriend} = friendsSlice.actions
// reducer
export default friendsSlice.reducer