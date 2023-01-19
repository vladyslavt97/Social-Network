import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './friendsReducer';

export default configureStore({
    reducer: friendsReducer,
});

