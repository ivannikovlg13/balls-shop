import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  activeCategoryId: 0,
  sort: {
    name: 'popular (descending)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    activeCategory(state, action: PayloadAction<number>) {
      state.activeCategoryId = action.payload;
    },
    setSelected(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.activeCategoryId = Number(action.payload.activeCategoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.activeCategoryId = 0;
        state.sort = {
          name: 'popular',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
      }
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { activeCategory, setSelected, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
