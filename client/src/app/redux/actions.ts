import { createAction } from "@reduxjs/toolkit";
import { Friend } from "./rootReducer";
const actions = {
    friendsUpdated: createAction<string>('friendsUpdated'),
    // setNotificationsCount: createAction<number>('setNotificationsCount')
    makeFriend: createAction<Friend>('makefriend'),
    
};
export const { friendsUpdated, makeFriend } = actions;