import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return '';
    }
  }
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
