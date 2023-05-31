import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import categorySlice from '../slice/categorySlice';
import signupSlice from '../slice/signupSlice';
import navSlice from '../slice/navSlice';
import chatSlice from '../slice/chatSlice';
import signupValiditySlice from '../slice/signupValiditySlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    signup: signupSlice,
    signupvalid: signupValiditySlice,
    nav: navSlice,
    chat: chatSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;