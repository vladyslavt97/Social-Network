import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './rootReducer';

export default configureStore({
    reducer: {
        friends: friendsReducer,
    },
});

