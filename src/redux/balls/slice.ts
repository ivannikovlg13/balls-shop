import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchBalls } from './asyncActions';
import { Ball, BallsSliceState, SearchBallParams, STATUS } from './types';

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

export const { setItems } = ballsSlice.actions;
export default ballsSlice.reducer;
