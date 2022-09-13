import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  countItems: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      state.countItems = state.items.reduce((sum, obj) => obj.count + sum, 0);
    },
    removeItems(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = state.totalPrice - action.payload.price * action.payload.count;
      state.countItems = state.countItems - action.payload.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.countItems = 0;
    },
    onClickMinus(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
      state.countItems = state.countItems - 1;
      state.totalPrice = state.totalPrice - action.payload.price;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItems, removeItems, clearItems, onClickMinus } = cartSlice.actions;
export default cartSlice.reducer;
