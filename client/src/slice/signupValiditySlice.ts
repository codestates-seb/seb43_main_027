import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SignupValidity } from '../types/dataTypes';

const initialStateSignupValidity:SignupValidity = {
  usernamevalid: false,
  emailvalid: false,
  passwordvalid: false,
  emailconfirmed: false,
}

const signupValiditySlice = createSlice({
  name: 'signupvalid',
  initialState: { ...initialStateSignupValidity },
  reducers: {
    setSignupValidity(state, action: PayloadAction<{ key: keyof SignupValidity; value: boolean }>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    clearSignupValidity() {
      return initialStateSignupValidity;
    }
  }
});

export const { setSignupValidity, clearSignupValidity } = signupValiditySlice.actions;
export default signupValiditySlice.reducer;