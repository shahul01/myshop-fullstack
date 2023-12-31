import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CartSliceState = {
  products: [
    {
      id: '2',
      title: 'Turtleneck',
      image: {src: '/images/products/turtleneck.png', alt: 'Turtleneck'},
      price: '$29.99',
    },
  ]
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addProduct: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.products.push(action.payload);
    }
  }
});

export interface CartSliceState {
  products: Array<Record<string, unknown>>;
};
