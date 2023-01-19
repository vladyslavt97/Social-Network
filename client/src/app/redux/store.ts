import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './friendsSlice';
import messagesReducer from './messagesReducer';

// export default configureStore({
//     reducer: { 
//         friendsReducer,
//         messagesReducer,
//     }
// });

export const store = configureStore({
    reducer: { 
        friendsReducer,
        messagesReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch