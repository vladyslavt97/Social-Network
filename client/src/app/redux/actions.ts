import { createAction } from "@reduxjs/toolkit";

const actions = {
    friendsUpdated: createAction<string>('friendsUpdated'),
    setNotificationsCount: createAction<number>('setNotificationsCount')
};
export const { friendsUpdated, setNotificationsCount } = actions;