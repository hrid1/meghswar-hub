import { get } from "http";
import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";

import { Rider, RiderResponse } from "./riderType";

export const ridersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRiders: builder.query({
      query: ({ isActive, page = 1, limit = 20 }) => ({
        url: "/riders",
        method: "GET",
        params: {
          isActive,
          page,
          limit,
        },
      }),
      providesTags: [TAG_TYPES.Riders],
    }),

    getRiderById: builder.query<RiderResponse, string>({
      query: (id) => ({
        url: `/riders/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Riders],
    }),
  }),
});

export const { useGetRidersQuery, useGetRiderByIdQuery } = ridersApi;
