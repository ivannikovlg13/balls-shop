import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type SearchBallParams = {
  currentPage: string;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

export const fetchBalls = createAsyncThunk<Ball[], SearchBallParams>(
  'balls/fetchBallsStatus',
  async (params) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get(
      `https://630e35b2109c16b9abf71c53.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

type Ball = {
  id: string;
  name: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  price: number;
};
export enum STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface BallsSliceState {
  items: Ball[];
  status: STATUS;
}

const initialState: BallsSliceState = {
  items: [],
  status: STATUS.LOADING,
};

export const ballsSlice = createSlice({
  name: 'balls',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Ball[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalls.pending, (state) => {
      state.status = STATUS.LOADING;
      state.items = [];
    });
    builder.addCase(fetchBalls.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchBalls.rejected, (state) => {
      state.status = STATUS.ERROR;
      state.items = [];
    });
  },
});

export const selectBalls = (state: RootState) => state.balls;

export const { setItems } = ballsSlice.actions;
export default ballsSlice.reducer;
