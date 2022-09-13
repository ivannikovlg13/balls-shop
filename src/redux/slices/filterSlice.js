import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  activeCategoryId: 0,
  sort: {
    name: 'popular (descending)',
    sortProperty: 'rating',
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});
export const selectFilter = (state) => state.filter;
export const selectSortName = (state) => state.filter.sort.name;
export const selectActiveCategoryId = (state) => state.filter.activeCategoryId;
export const selectSearchValue = (state) => state.filter.searchValue;

export const { activeCategory, setSelected, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
