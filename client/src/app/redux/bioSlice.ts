import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BioState {
    biovalue: string;
}
const initialState: BioState = {
    biovalue: '',
};

export const bioSlice = createSlice({
  name: 'bio',
  initialState,
  reducers: {
    setBioRedux: (state, bioAction: PayloadAction<string>) => {//action instructs how to change
        console.log('bioAction: ', bioAction.payload);
        
      state.biovalue = bioAction.payload;
    },
    modifyBio: (state, bioAction: PayloadAction<string>) => {
        console.log('messagesAction received: ', bioAction.payload);
        console.log('state.messagesValue: ', state.biovalue);
        state.biovalue = bioAction.payload;
    },
  },
});

export const { setBioRedux, modifyBio} = bioSlice.actions // Action
export default bioSlice.reducer //reducer