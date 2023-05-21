import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/dataTypes';

const initialState: User = {
  memberId: -1,
  email: '',
  userName: '',
  memberStatus: '',
  imageUrl: '',
  createdAt: '',
  updatedAt: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialState },
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    }
  }
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
