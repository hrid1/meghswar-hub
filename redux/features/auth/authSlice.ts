import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authApi";

const ACCESS_TOKEN_COOKIE_KEY = "access_token";
const REFRESH_TOKEN_COOKIE_KEY = "refresh_token";

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie?.split("; ").find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  access_token: getCookie(ACCESS_TOKEN_COOKIE_KEY),
  refresh_token: getCookie(REFRESH_TOKEN_COOKIE_KEY),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string; user: User | null }>
    ) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.user = action.payload.user;
      setCookie(ACCESS_TOKEN_COOKIE_KEY, action.payload.access_token);
      setCookie(REFRESH_TOKEN_COOKIE_KEY, action.payload.refresh_token);
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setTokens: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>
    ) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      setCookie(ACCESS_TOKEN_COOKIE_KEY, action.payload.access_token);
      setCookie(REFRESH_TOKEN_COOKIE_KEY, action.payload.refresh_token);
    },
    logOut: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      deleteCookie(ACCESS_TOKEN_COOKIE_KEY);
      deleteCookie(REFRESH_TOKEN_COOKIE_KEY);
    },
  },
});

export const { setCredentials, setUser, setTokens, logOut } = authSlice.actions;
export default authSlice.reducer;
