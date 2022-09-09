import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import balls from './slices/ballsSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    balls,
  },
});
