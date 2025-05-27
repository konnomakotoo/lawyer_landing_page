import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import teamReducer from '../slices/teamSlice'
import categoriesReducer from '../slices/categoriesSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    categories: categoriesReducer,
  },
}); 


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;