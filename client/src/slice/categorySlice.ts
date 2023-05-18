import { createSlice } from '@reduxjs/toolkit';
import { CategoryType } from '../types/dataTypes';

const initialState: CategoryType = {
  categoryId: -1,
  categoryName: ''
};

const userSlice = createSlice({
  name: 'category',
  initialState: { ...initialState },
  reducers: {
    setCategory(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    clearCategory() {
      return initialState;
    }
  }
});
export const { setCategory, clearCategory } = userSlice.actions;
export default userSlice.reducer;
