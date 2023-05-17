import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slice/userSlice';
import categorySlice from '../slice/categorySlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
