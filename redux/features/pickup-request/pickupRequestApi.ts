import { baseApi } from "../api/baseApi";
import {
  PickupRequestListResponse,
  AcceptedPickupResponse,
  ConfirmedPickupResponse,
} from "./pickupRequestType";
import { TAG_TYPES } from "../tagList";

export const pickupRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPickupRequests: builder.query<
      PickupRequestListResponse,
      { page?: number; limit?: number; status?: string }
    >({
      query: ({ page = 1, limit = 20, status }) => ({
        url: "/pickup-requests/hub/my-requests",
        method: "GET",
        params: { page, limit, status },
      }),
      providesTags: [TAG_TYPES.PickupRequests],
    }),

    assignRider: builder.mutation<
      any,
      { rider_id: string; pickup_ids: string[] }
    >({
      query: ({ rider_id, pickup_ids }) => ({
        url: "/pickup-requests/hub/bulk-assign-rider",
        method: "POST",
        body: { rider_id, pickup_ids },
      }),
      invalidatesTags: [TAG_TYPES.PickupRequests],
    }),

    getAcceptedPickups: builder.query<
      AcceptedPickupResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 20, search }) => ({
        url: "/pickup-requests/hub/accepted-pickups",
        method: "GET",
        params: { page, limit, ...(search && { search }) },
      }),
      providesTags: [TAG_TYPES.PickupRequests],
    }),

    getConfirmedPickups: builder.query<
      ConfirmedPickupResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 20, search }) => ({
        url: "/pickup-requests/hub/confirmed-pickups",
        method: "GET",
        params: { page, limit, ...(search && { search }) },
      }),
      providesTags: [TAG_TYPES.PickupRequests],
    }),
  }),
});

export const {
  useGetPickupRequestsQuery,
  useAssignRiderMutation,
  useGetAcceptedPickupsQuery,
  useGetConfirmedPickupsQuery,
} = pickupRequestApi;
