import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import signupSlice from '../slice/signupSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    signup: signupSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
