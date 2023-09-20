import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../services/authActions";

type InitialState = {
  user: AuthState;
};

type AuthState = {
  isLoggedIn: boolean;
  username: string;
  token: string;
};

const initialState = {
  user: {
    isLoggedIn: false,
    username: "",
    token: "",
  },
  error: null,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login: (_, action: PayloadAction) => {
    //   return {
    //     value: {
    //       isLoggedIn: true,
    //       username: action.payload.username,
    //       token: action.payload.jwt,
    //     },
    //   };
    // },
    logout: () => {
      return initialState;
    },
    clearError: (state) => {
        state.error = null;
    }
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user.isLoggedIn = true;
      state.user.username = payload.user.username;
      state.user.token = payload.jwt;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearError, logout } = auth.actions;
export default auth.reducer;
