import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IAuthenticationState {
  token?: string | null;
  id?: string | null;
}

const initialState: IAuthenticationState = {
  token: null,
  id: null
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    changeAuthenticationState: (state, action: PayloadAction<IAuthenticationState>) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    changeUserId: (state, action: PayloadAction<IAuthenticationState>) => {
      state.id = action.payload.id;
    }
  }
});

export const { changeUserId, changeAuthenticationState } = AuthenticationSlice.actions;

export const getToken = (state: RootState) => state.authentication;

export default AuthenticationSlice.reducer;
