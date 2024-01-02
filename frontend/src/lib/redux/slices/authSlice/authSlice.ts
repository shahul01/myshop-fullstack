import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


const initialState: AuthSliceState = {
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setIsAuth: (state, action:PayloadAction<AuthPayload>) => {
      state.isAuth = action.payload.isAuth;
    }
  }

});

export interface AuthSliceState {
  isAuth: boolean;
};

interface AuthPayload {
  isAuth: boolean;
};
