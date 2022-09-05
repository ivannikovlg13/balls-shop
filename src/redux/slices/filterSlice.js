import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryId: 0,
  sortBy: {
    selected: { name: 'popular (descending)', sortProperty: 'rating' },
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    activeCategory(state, action) {
      state.activeCategoryId = action.payload;
    },
    setSelected(state, action) {
      state.sortBy.selected = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { activeCategory, setSelected, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;
