import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    setSignupInfo(state, action: PayloadAction<{ key: keyof typeof initialStateSignup; value: string }>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearSignupInfo() {
      return initialStateSignup;
    }
  }
});

export const { setSignupInfo, clearSignupInfo } = signupSlice.actions;
export default signupSlice.reducer;