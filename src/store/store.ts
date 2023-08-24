import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import postReducer from '../slices/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
