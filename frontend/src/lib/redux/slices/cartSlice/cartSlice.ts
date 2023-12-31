import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: CartSliceState = {
  products: []
};

function handleAddProduct(state:CartSliceState, payload:CartPayload) {
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
    addProduct: (state, action: PayloadAction<CartPayload>) => {
      handleAddProduct(state, action.payload);

    }
  }
});

interface CartPayload {
  id: string;
  title: string;
  image: {src: string; alt: string};
  price: string;
};

interface CartProduct extends CartPayload {
  qty: number;
}

export interface CartSliceState {
  products: Array<CartProduct>;
};
