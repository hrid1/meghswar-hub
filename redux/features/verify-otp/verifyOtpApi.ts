import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  PendingHubApprovalsResponse,
  ApproveHubBypassResponse,
  RejectHubBypassRequest,
  RejectHubBypassResponse,
} from "./verifyOtpTypes";

export const verifyOtpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * 1. List Pending Hub Approval Requests
     * GET /delivery-verifications/hub-approval/pending
     * Roles: HUB_MANAGER, ADMIN
     */
    getPendingHubApprovals: builder.query<PendingHubApprovalsResponse, void>({
      query: () => ({
        url: "/delivery-verifications/hub-approval/pending",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.DeliveryVerifications],
    }),

    /**
     * 2. Approve Hub Bypass Request
     * PATCH /delivery-verifications/:verificationId/hub-approval/approve
     * Roles: HUB_MANAGER, ADMIN
     */
    approveHubBypass: builder.mutation<ApproveHubBypassResponse, string>({
      query: (verificationId) => ({
        url: `/delivery-verifications/${verificationId}/hub-approval/approve`,
        method: "PATCH",
      }),
      invalidatesTags: [
        TAG_TYPES.DeliveryVerifications,
        TAG_TYPES.Parcels,
        TAG_TYPES.Dashboard,
      ],
    }),

    /**
     * 3. Reject Hub Bypass Request
     * PATCH /delivery-verifications/:verificationId/hub-approval/reject
     * Roles: HUB_MANAGER, ADMIN
     */
    rejectHubBypass: builder.mutation<
      RejectHubBypassResponse,
      RejectHubBypassRequest
    >({
      query: ({ verification_id, rejection_reason }) => ({
        url: `/delivery-verifications/${verification_id}/hub-approval/reject`,
        method: "PATCH",
        body: { rejection_reason },
      }),
      invalidatesTags: [
        TAG_TYPES.DeliveryVerifications,
        TAG_TYPES.Parcels,
        TAG_TYPES.Dashboard,
      ],
    }),
  }),
});

export const {
  useGetPendingHubApprovalsQuery,
  useApproveHubBypassMutation,
  useRejectHubBypassMutation,
} = verifyOtpApi;
