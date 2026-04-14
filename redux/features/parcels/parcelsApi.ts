import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  GetParcelsForAssignmentResponse,
  GetThirdPartyProvidersResponse,
  HubChargesRequest,
  HubChargesResponse,
  ParcelReportsResponse,
} from "./parcelTypes";

const parcelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all parcels
    getAllParcels: builder.query<any, void | undefined>({
      query: () => ({
        url: "/hubs/parcels",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    // get received parcels
    getReceivedParcels: builder.query({
      query: () => "/hubs/parcels/received",
      providesTags: [TAG_TYPES.Parcels],
    }),

    // receive parcels
    receiveParcels: builder.mutation({
      query: (parcelIds: string[]) => ({
        url: "/hubs/parcels/receive",
        method: "POST",
        body: { parcel_ids: parcelIds },
      }),
      invalidatesTags: [TAG_TYPES.Parcels],
    }),

    // after receiving parcels ready for assign rider
    getParcelsForAssignment: builder.query<
      GetParcelsForAssignmentResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/hubs/parcels/for-assignment",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    // assign rider to parcels
    assignRiderToParcels: builder.mutation({
      query: (data: { rider_id: string; parcel_ids: string[] }) => ({
        url: "/hubs/parcels/assign-rider",
        method: "POST",
        body: { rider_id: data.rider_id, parcel_ids: data.parcel_ids },
      }),
      invalidatesTags: [TAG_TYPES.Parcels],
    }),

    // ======================= HUBs Transfer =======================

    // /hubs/parcels/:id/transfer
    transferParcel: builder.mutation<
      any,
      { parcel_id: string; destination_hub_id: string; transfer_notes: string }
    >({
      query: (data: {
        parcel_id: string;
        destination_hub_id: string;
        transfer_notes: string;
      }) => ({
        url: `/hubs/parcels/${data.parcel_id}/transfer`,
        method: "POST",
        body: {
          destination_hub_id: data.destination_hub_id,
          transfer_notes: data.transfer_notes,
        },
      }),
      invalidatesTags: [TAG_TYPES.Parcels],
    }),

    // /hubs/parcels/bulk-transfer
    bulkTransferParcels: builder.mutation<
      any,
      {
        parcel_ids: string[];
        destination_hub_id: string;
        transfer_notes: string;
      }
    >({
      query: (data: {
        parcel_ids: string[];
        destination_hub_id: string;
        transfer_notes: string;
      }) => ({
        url: "/hubs/parcels/bulk-transfer",
        method: "PATCH",
        body: {
          parcel_ids: data.parcel_ids,
          destination_hub_id: data.destination_hub_id,
          transfer_notes: data.transfer_notes,
        },
      }),
      invalidatesTags: [TAG_TYPES.Parcels],
    }),

    // get assigned parcels
    getHubOutgoingParcels: builder.query<
      any,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/hubs/parcels/outgoing",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    // get incoming parcels
    getHubIncomingParcels: builder.query<
      any,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/hubs/parcels/incoming",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    // {
    //   "parcel_ids": [
    //     "{{parcel_3}}",
    //     "{{parcel_4}}"
    //   ]
    // }
    // receive incoming parcels from other hub
    receiveIncomingParcels: builder.mutation({
      query: (parcelIds: string[]) => ({
        url: "/hubs/parcels/bulk-accept",
        method: "PATCH",
        body: { parcel_ids: parcelIds },
      }),
      invalidatesTags: [TAG_TYPES.Parcels],
    }),

    // /hubs/
    inHubParcels: builder.query<
      any,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/parcels/in-hub",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    // ================Assign Parcel to Third Party Provider (carrybee)================

    // /carrybee/parcels/assigned
    getAssignedParcelsToThirdPartyProvider: builder.query<
      any,
      void | undefined
    >({
      query: () => ({
        url: "/carrybee/parcels/for-assignment",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    // get third party providers
    getThirdPartyProviders: builder.query<
      GetThirdPartyProvidersResponse,
      void | undefined
    >({
      query: () => ({
        url: "/third-party-providers/active",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    // assign parcel to third party provider
    assignParcelToThirdPartyProvider: builder.mutation({
      query: (data: {
        parcel_ids: string[];
        third_party_provider_id: string;
        notes: string;
      }) => ({
        url: `carrybee/parcels/assign/carrybee`,
        method: "POST",
        body: {
          parcel_ids: data.parcel_ids,
          provider_id: data.third_party_provider_id,
          notes: data.notes,
        },
      }),
      invalidatesTags: [TAG_TYPES.Parcels],
    }),

    // parcel reports
    // /hubs/parcels/reports?hub_id=8f8c6c8a-e8b4-4c37-88d0-249b09c69758&search=TRK-20260413-00031&issue_type=INCORRECT_PHONE&page=1&limit=10
    getParcelReports: builder.query<
      ParcelReportsResponse,
      { page?: number; limit?: number; hub_id?: string; search?: string; issue_type?: string }
    >({
      query: ({ page = 1, limit = 20, hub_id, search, issue_type }) => ({
        url: "/hubs/parcels/reports",
        method: "GET",
        params: { page, limit, hub_id, search, issue_type },
      }),
      providesTags: [TAG_TYPES.Parcels],
    }),

    updateHubCharges: builder.mutation<
      HubChargesResponse,
      { id: string; charges: HubChargesRequest }
    >({
      query: ({ id, charges }) => ({
        // /parcels/:id/hub-charges
        url: `/parcels/${id}/hub-charges`,
        method: "PATCH",
        body: charges,
      }),
      invalidatesTags: [TAG_TYPES.Parcels],
    }),



  }),
});

export const {
  useGetAllParcelsQuery,
  useGetReceivedParcelsQuery,
  useReceiveParcelsMutation,
  useGetParcelsForAssignmentQuery,
  useAssignRiderToParcelsMutation,
  useBulkTransferParcelsMutation,
  useGetHubOutgoingParcelsQuery,
  useGetHubIncomingParcelsQuery,
  useReceiveIncomingParcelsMutation,
  useAssignParcelToThirdPartyProviderMutation,
  useGetThirdPartyProvidersQuery,
  useUpdateHubChargesMutation,
  useInHubParcelsQuery,
  useGetParcelReportsQuery,
} = parcelsApi;
