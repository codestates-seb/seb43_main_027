import { createSlice } from '@reduxjs/toolkit';
import { Validity } from '../types/dataTypes';

const initialState: Validity = {
  usernameValid: false,
  emailValid: false,
  passwordValid: false
};

const validitySlice = createSlice({
  name: 'validity',
  initialState: { ...initialState },
  reducers: {
    setUserNameValidity(state, action) {
      return {...state, usernameValid:action.payload}
    },
    setEmailValidity(state, action) {
      return {...state, emailValid:action.payload}
    },
    setPasswordValidity(state, action){
      return {...state, passwordValid:action.payload}
    }
  }
});
export const { setUserNameValidity, setEmailValidity, setPasswordValidity } = validitySlice.actions;
export default validitySlice.reducer;