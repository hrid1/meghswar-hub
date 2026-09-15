import { baseApi } from "../api/baseApi";
import {
  PickupRequestListResponse,
  AcceptedPickupResponse,
  ConfirmedPickupResponse,
  AssignPickupRiderRequest,
  AssignPickupRiderResponse,
} from "./pickupRequestType";
import { TAG_TYPES } from "../tagList";

export const pickupRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPickupRequests: builder.query<
      PickupRequestListResponse,
      { page?: number; limit?: number; status?: string; search?: string }
    >({
      query: ({ page = 1, limit = 20, status, search }) => ({
        url: "/pickup-requests/hub/my-requests",
        method: "GET",
        params: {
          page,
          limit,
          ...(status ? { status } : {}),
          ...(search?.trim() ? { search: search.trim() } : {}),
        },
      }),
      providesTags: [TAG_TYPES.PickupRequests],
    }),

    assignRider: builder.mutation<
      AssignPickupRiderResponse,
      AssignPickupRiderRequest
    >({
      query: ({ rider_id, pickup_ids, notes }) => ({
        url: "/pickup-requests/hub/bulk-assign-rider",
        method: "POST",
        body: {
          rider_id,
          pickup_ids,
          ...(notes?.trim() ? { notes: notes.trim() } : {}),
        },
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
