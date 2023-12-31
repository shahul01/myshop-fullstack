import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CartSliceState = {
  products: [
    {
      id: '2',
      title: 'Turtleneck',
      image: {src: '/images/products/turtleneck.png', alt: 'Turtleneck'},
      price: '$29.99',
      qty: 1,
    },
  ]
};

function handleAddProduct(state:CartSliceState, payload:PayloadAction<Record<string, unknown>>) {
  const matchedProduct = state.products.find(currProduct  => (
    currProduct.id === payload.id
  ));

  if (matchedProduct) {
    matchedProduct.qty += 1;
  } else {
    state.products.push({
      ...payload,
      qty: 1
    })
  };
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addProduct: (state, action: PayloadAction<Record<string, unknown>>) => {
      handleAddProduct(state, action.payload);

    }
  }
});

export interface CartSliceState {
  products: Array<Record<string, unknown>>;
};
