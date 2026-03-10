import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  RescheduledDeliveriesResponse,
  DeliveryOutcomesResponse,
  ReturnToMerchantResponse,
} from "./processUnprocessType";

interface PaginationParams {
  page?: number;
  limit?: number;
}

const processUnprocessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReturnToMerchant: builder.query<
      ReturnToMerchantResponse,
      PaginationParams
    >({
      query: (params = {}) => ({
        url: "/hubs/parcels/return-to-merchant",
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      }),
      providesTags: [TAG_TYPES.Hubs],
    }),

    getRescheduledDeliveries: builder.query<
      RescheduledDeliveriesResponse,
      PaginationParams
    >({
      query: (params = {}) => ({
        url: "/hubs/parcels/rescheduled",
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      }),
      providesTags: [TAG_TYPES.Hubs],
    }),

    getDeliveryOutcomes: builder.query<
      DeliveryOutcomesResponse,
      PaginationParams
    >({
      query: (params = {}) => ({
        url: "/hubs/parcels/delivery-outcomes",
        params: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
        },
      }),
      providesTags: [TAG_TYPES.Hubs],
    }),

    // assign parcle
    bulkReturnToMerchant: builder.mutation<any, { parcel_ids: string[] }>({
      query: (body: { parcel_ids: string[] }) => ({
        url: "/hubs/parcels/bulk-return-to-merchant",
        method: "POST",
        body: {
          parcel_ids: body.parcel_ids,
        },
      }),
      invalidatesTags: [TAG_TYPES.Hubs],
    }),

    // /hubs/parcels/bulk-reschedule-delivery
    bulkRescheduleDelivery: builder.mutation<any, { parcel_ids: string[] }>({
      query: (body: { parcel_ids: string[] }) => ({
        url: "/hubs/parcels/bulk-reschedule-delivery",
        method: "POST",
        body: {
          parcel_ids: body.parcel_ids,
        },
      }),
      invalidatesTags: [TAG_TYPES.Hubs],
    }),
  }),
});

export const {
  useGetReturnToMerchantQuery,
  useGetRescheduledDeliveriesQuery,
  useGetDeliveryOutcomesQuery,
  useBulkReturnToMerchantMutation,
  useBulkRescheduleDeliveryMutation,
} = processUnprocessApi;
