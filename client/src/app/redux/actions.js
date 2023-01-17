import { createAction } from "@reduxjs/toolkit";

const actions = {
    friendsUpdated: createAction('friendsUpdated')
};
export const { friendsUpdated } = actions;