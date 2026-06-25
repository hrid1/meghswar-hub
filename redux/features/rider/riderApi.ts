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
  RidersForTransferResponse,
  AvailableRidersForTransferResponse,
  RiderParcelsForTransferResponse,
  TransferParcelsResponse,
  GetRidersForTransferParams,
  GetAvailableRidersForTransferParams,
  TransferParcelsRequest,
} from "./riderType";

export const ridersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints
    getRiders: builder.query<RiderResponse, { isActive?: boolean; page?: number; limit?: number } | void>({
      query: ({ isActive, page = 1, limit = 20 } = {}) => ({
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

    // ─── Rider Transfer Endpoints ───────────────────────────────────────────

    getRidersForTransfer: builder.query<
      RidersForTransferResponse,
      GetRidersForTransferParams | void
    >({
      query: ({ page = 1, limit = 20 } = {}) => ({
        url: "/hubs/rider-transfer/riders",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [TAG_TYPES.Riders],
    }),

    getAvailableRidersForTransfer: builder.query<
      AvailableRidersForTransferResponse,
      GetAvailableRidersForTransferParams | void
    >({
      query: (params) => ({
        url: "/hubs/rider-transfer/riders/available",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: [TAG_TYPES.Riders],
    }),

    getRiderParcelsForTransfer: builder.query<
      RiderParcelsForTransferResponse,
      { riderId: string; page?: number; limit?: number }
    >({
      query: ({ riderId, page = 1, limit = 20 }) => ({
        url: `/hubs/rider-transfer/riders/${riderId}/parcels`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    transferParcels: builder.mutation<
      TransferParcelsResponse,
      TransferParcelsRequest
    >({
      query: (body) => ({
        url: "/hubs/rider-transfer/transfer",
        method: "POST",
        body: {
          target_rider_id: body.target_rider_id,
          parcel_ids: body.parcel_ids,
          notes: body.notes ?? "",
        },
      }),
      invalidatesTags: [TAG_TYPES.Parcels, TAG_TYPES.Riders],
    }),
  }),
});

export const {
  useGetRidersQuery,
  useGetRiderByIdQuery,
  useGetRidersPerformanceQuery,
  useGetPendingHubApprovalsQuery,
  useHubApproveOrDeclineMutation,
  useGetRidersForTransferQuery,
  useGetAvailableRidersForTransferQuery,
  useGetRiderParcelsForTransferQuery,
  useTransferParcelsMutation,
} = ridersApi;