import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialActiveCategory: 0,
};

export const filterSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    activeCategory(state, action) {
      state.initialActiveCategory = action.payload;
    },
  },
});

export const { activeCategory } = filterSlice.actions;
export default filterSlice.reducer;
