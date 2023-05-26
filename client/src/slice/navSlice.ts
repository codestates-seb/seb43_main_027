import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
  name: 'nav',
  initialState: {
    isOpened: false,
    isDisplayed: false
  },
  reducers: {
    openNav(state) {
      return { ...state, isOpened: true };
    },
    displayNav(state) {
      return { ...state, isDisplayed: true };
    },
    hideNav(state) {
      return { ...state, isDisplayed: false };
    },
    closeNav(state) {
      return { ...state, isOpened: false };
    }
  }
});
export const { openNav, closeNav, displayNav, hideNav } = navSlice.actions;
export default navSlice.reducer;
