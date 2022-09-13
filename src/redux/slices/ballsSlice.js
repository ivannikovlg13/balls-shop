import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBalls = createAsyncThunk('balls/fetchBallsStatus', async (params) => {
  const { currentPage, category, sortBy, order, search } = params;
  const { data } = await axios.get(
    `https://630e35b2109c16b9abf71c53.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});
const initialState = {
  items: [],
  status: 'loading',
};

export const ballsSlice = createSlice({
  name: 'balls',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchBalls.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchBalls.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchBalls.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectBalls = (state) => state.balls;

export const { setItems } = ballsSlice.actions;
export default ballsSlice.reducer;
