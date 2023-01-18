import { createAction } from "@reduxjs/toolkit";
import { Friend } from "../interface";
const actions = {
    friendsUpdated: createAction<string>('friendsUpdated'),
    makeFriend: createAction<Friend>('makefriend'),
    unfriend: createAction<Friend>('unfriend'),
    
};
export const { friendsUpdated, makeFriend, unfriend } = actions;