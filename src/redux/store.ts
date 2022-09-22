import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './filter/slice';
import cart from './cart/slice';
import balls from './balls/slice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    balls,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
