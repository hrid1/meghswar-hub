import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";
import { setTokens, logOut } from "../auth/authSlice";
import { tagTypes } from "../tagList";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithoutAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;
  const isRefreshRequest = url === "/auth/refresh";

  let result = await baseQuery(args, api, extraOptions);
  if (!result.error || result.error.status !== 401 || isRefreshRequest)
    return result;

  const state = api.getState() as RootState;
  const refreshToken = state.auth.refresh_token;
  if (!refreshToken) {
    api.dispatch(logOut());
    return result;
  }

  const refreshResult = await baseQueryWithoutAuth(
    { url: "/auth/refresh", method: "POST", body: { refreshToken } },
    api,
    extraOptions,
  );

  if (refreshResult.data) {
    const refreshData = refreshResult.data as {
      data: { accessToken: string; refreshToken: string };
    };
    api.dispatch(
      setTokens({
        access_token: refreshData.data.accessToken,
        refresh_token: refreshData.data.refreshToken,
      }),
    );
    result = await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logOut());
    if (typeof window !== "undefined") window.location.href = "/auth";
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: tagTypes,
});
