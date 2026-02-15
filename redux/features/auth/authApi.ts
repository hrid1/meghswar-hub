import { baseApi } from "../api/baseApi";


export interface User {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: "ADMIN" | "MERCHANT" | "HUB_MANAGER" | "RIDER";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  data: { accessToken: string; refreshToken: string; user: User };
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
