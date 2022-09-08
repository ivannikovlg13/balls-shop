import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryId: 0,
  sort: {
    name: 'popular (descending)',
    sortProperty: 'rating',
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
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.activeCategoryId = Number(action.payload.activeCategoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const { activeCategory, setSelected, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
