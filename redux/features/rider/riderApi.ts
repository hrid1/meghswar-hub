import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";

import {
  RiderResponse,
  RiderByIdResponse,
  RiderPerformanceResponse,
  RiderPerformanceParams,
  PendingHubApprovalsResponse,
  PendingHubApprovalsParams,
  HubApprovalRequest,
  HubApprovalResponse,
} from "./riderType";

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

    getRiderById: builder.query<RiderByIdResponse, string>({
      query: (id) => ({
        url: `/riders/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Riders],
    }),

    getRidersPerformance: builder.query<
      RiderPerformanceResponse,
      RiderPerformanceParams | void
    >({
      query: (params) => ({
        url: "/hubs/riders/performance",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: [TAG_TYPES.Riders],
    }),

    getPendingHubApprovals: builder.query<
      PendingHubApprovalsResponse,
      PendingHubApprovalsParams | void
    >({
      query: (params) => ({
        url: "/delivery-verifications/hub-approval/pending",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: [TAG_TYPES.DeliveryVerifications],
    }),

    hubApproveOrDecline: builder.mutation<
      HubApprovalResponse,
      HubApprovalRequest
    >({
      query: ({ id, action }) => ({
        url: `/delivery-verifications/${id}/hub-approval/${action}`,
        method: "PATCH",
      }),
      invalidatesTags: [TAG_TYPES.DeliveryVerifications],
    }),
  }),
});

export const {
  useGetRidersQuery,
  useGetRiderByIdQuery,
  useGetRidersPerformanceQuery,
  useGetPendingHubApprovalsQuery,
  useHubApproveOrDeclineMutation,
} = ridersApi;
