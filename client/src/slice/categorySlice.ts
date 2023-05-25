import { createSlice } from '@reduxjs/toolkit';
import { CategoryType } from '../types/dataTypes';

const initialState: CategoryType = {
  categoryId: -1,
  categoryName: ''
};

const categorySlice = createSlice({
  name: 'category',
  initialState: { ...initialState },
  reducers: {
    setCategory(state, action) {
      return action.payload;
    },
    clearCategory() {
      return initialState;
    }
  }
});
export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
