import { authSlice, cartSlice } from './slices';

// add to redux state
export const reducer = {
  auth: authSlice.reducer,
  cart: cartSlice.reducer
};
