import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import categorySlice from '../slice/categorySlice';
import signupSlice from '../slice/signupSlice';
import navSlice from '../slice/navSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    signup: signupSlice,
    nav: navSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
