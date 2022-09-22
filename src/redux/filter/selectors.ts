import { RootState } from '../store';

export const selectFilter = (state: RootState) => state.filter;
export const selectSortName = (state: RootState) => state.filter.sort.name;
export const selectActiveCategoryId = (state: RootState) => state.filter.activeCategoryId;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;
