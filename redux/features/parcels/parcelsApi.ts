import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import { GetParcelsForAssignmentResponse } from "./parcelTypes";

const parcelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetReceivedParcelsQuery,
  useReceiveParcelsMutation,
  useGetParcelsForAssignmentQuery,
  useAssignRiderToParcelsMutation,
  useBulkTransferParcelsMutation,
  useGetHubOutgoingParcelsQuery,
  useGetHubIncomingParcelsQuery,
  useReceiveIncomingParcelsMutation,
} = parcelsApi;
