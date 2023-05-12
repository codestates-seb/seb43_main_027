import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import validitySlice from '../slice/validitySlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    validity: validitySlice,
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
