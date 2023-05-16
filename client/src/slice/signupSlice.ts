import { createSlice } from '@reduxjs/toolkit';
import { Signup } from '../types/dataTypes';

const initialStateSignup:Signup = {
  username: '',
  email: '',
  password: ''
}

const signupSlice = createSlice({
  name: 'signup',
  initialState: { ...initialStateSignup },
  reducers: {
    setSignupInfo(state, action) {
      state = action.payload;
    },
    clearSignupInfo() {
      return initialStateSignup;
    }
  }
});

export const { setSignupInfo, clearSignupInfo } = signupSlice.actions;
export default signupSlice.reducer;