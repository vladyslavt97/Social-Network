import { configureStore } from '@reduxjs/toolkit';
import bioSlice from './bioSlice';
import friendsSlice from './friendsSlice';
import messagesSlice from './messagesSlice';

export const store = configureStore({
    reducer: { 
        friends: friendsSlice,
        messages: messagesSlice,
        bio: bioSlice,
        // userOnline: userOnlineSlice,
        //selectedUserId: selectedUserIdSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch