import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
  name: 'nav',
  initialState: false,
  reducers: {
    openNav() {
      return true;
    },
    closeNav() {
      return false;
    }
  }
});
export const { openNav, closeNav } = navSlice.actions;
export default navSlice.reducer;
