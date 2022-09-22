import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ball, SearchBallParams } from './types';

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
