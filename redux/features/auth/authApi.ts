import { baseApi } from "../api/baseApi";

/** Hub block returned with HUB_MANAGER on `/auth/me` */
export interface AuthHub {
  id: string;
  hub_code: string;
  branch_name: string;
  area: string;
  address: string;
}

export interface User {
  /** Some responses use `user_id` instead of `id` */
  id?: string;
  user_id?: string;
  full_name: string;
  phone: string;
  email: string;
  role: "ADMIN" | "MERCHANT" | "HUB_MANAGER" | "RIDER";
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  hub_manager_id?: string;
  hub_id?: string;
  hub?: AuthHub;
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
      transformResponse: (response: { data?: User } | User) => {
        const raw = "data" in response && response.data ? response.data : (response as User);
        return {
          ...raw,
          id: raw.id ?? raw.user_id,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
