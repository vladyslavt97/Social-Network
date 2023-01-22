import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../interface";

export interface BioState {
    userInfoValue: UserInfo[];
}
const initialState: BioState = {
    userInfoValue: [],
};

export const bioSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    userInfoState: (state, userInfoAction: PayloadAction<UserInfo[]>) => {
      console.log('fp in user', userInfoAction.payload);
      state.userInfoValue = userInfoAction.payload;
    },
    addBioUpdate: (state, userInfoAction: PayloadAction<UserInfo>) => {
        console.log('messagesAction received: ', userInfoAction.payload);
        console.log('state.messagesValue: ', state.userInfoValue);
        // state.userInfoValue.unshift(userInfoAction.payload);
    }
  },
});

export const { userInfoState, addBioUpdate} = bioSlice.actions
export default bioSlice.reducer