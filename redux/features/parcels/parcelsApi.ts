import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";

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
    getParcelsForAssignment: builder.query({
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
  }),
});

export const { 
  useGetReceivedParcelsQuery, 
  useReceiveParcelsMutation, 
  useGetParcelsForAssignmentQuery, 
  useAssignRiderToParcelsMutation 
} = parcelsApi;