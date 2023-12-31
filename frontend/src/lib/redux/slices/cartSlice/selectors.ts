import type { ReduxState } from '@/lib/redux';


export const selectCart = (state: ReduxState) => (
  state.cart.products
);
