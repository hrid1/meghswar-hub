import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  RescheduledDeliveriesResponse,
  RescheduledDeliveriesQueryParams,
  DeliveryOutcomesResponse,
  DeliveryOutcomesQueryParams,
  ReturnToMerchantResponse,
  ReturnToMerchantQueryParams,
  AssignParcelToCarrybeeParams,
  AssignParcelToCarrybeeResponse,
} from "./processUnprocessType";

const processUnprocessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReturnToMerchant: builder.query<
      ReturnToMerchantResponse,
      ReturnToMerchantQueryParams | void
    >({
      query: (params = {}) => ({
        url: "/hubs/parcels/return-to-merchant",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.zone ? { zone: params.zone } : {}),
          ...(params?.merchantId ? { merchantId: params.merchantId } : {}),
          ...(params?.customerName ? { customerName: params.customerName } : {}),
          ...(params?.customerPhone ? { customerPhone: params.customerPhone } : {}),
          ...(params?.merchantName ? { merchantName: params.merchantName } : {}),
          ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
          ...(params?.order ? { order: params.order } : {}),
        },
      }),
      providesTags: [TAG_TYPES.Hubs, TAG_TYPES.Parcels],
    }),

    getRescheduledDeliveries: builder.query<
      RescheduledDeliveriesResponse,
      RescheduledDeliveriesQueryParams | void
    >({
      query: (params = {}) => ({
        url: "/hubs/parcels/rescheduled",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.zone ? { zone: params.zone } : {}),
          ...(params?.merchantId ? { merchantId: params.merchantId } : {}),
          ...(params?.storeId ? { storeId: params.storeId } : {}),
          ...(params?.customerName ? { customerName: params.customerName } : {}),
          ...(params?.customerPhone ? { customerPhone: params.customerPhone } : {}),
          ...(params?.merchantName ? { merchantName: params.merchantName } : {}),
          ...(params?.area ? { area: params.area } : {}),
          ...(params?.minAmount !== undefined ? { minAmount: params.minAmount } : {}),
          ...(params?.maxAmount !== undefined ? { maxAmount: params.maxAmount } : {}),
          ...(params?.deliveryType ? { deliveryType: params.deliveryType } : {}),
          ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
          ...(params?.order ? { order: params.order } : {}),
        },
      }),
      providesTags: [TAG_TYPES.Hubs, TAG_TYPES.Parcels],
    }),

    getDeliveryOutcomes: builder.query<
      DeliveryOutcomesResponse,
      DeliveryOutcomesQueryParams | void
    >({
      query: (params = {}) => ({
        url: "/hubs/parcels/delivery-outcomes",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.status ? { status: params.status } : {}),
          ...(params?.zone ? { zone: params.zone } : {}),
          ...(params?.merchantId ? { merchantId: params.merchantId } : {}),
          ...(params?.customerName ? { customerName: params.customerName } : {}),
          ...(params?.customerPhone ? { customerPhone: params.customerPhone } : {}),
          ...(params?.merchantName ? { merchantName: params.merchantName } : {}),
          ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
          ...(params?.order ? { order: params.order } : {}),
        },
      }),
      providesTags: [TAG_TYPES.Hubs, TAG_TYPES.Parcels],
    }),

    // Bulk Return To Merchant
    bulkReturnToMerchant: builder.mutation<any, { parcel_ids: string[] }>({
      query: (body: { parcel_ids: string[] }) => ({
        url: "/hubs/parcels/bulk-return-to-merchant",
        method: "POST",
        body: {
          parcel_ids: body.parcel_ids,
        },
      }),
      invalidatesTags: [TAG_TYPES.Hubs, TAG_TYPES.Parcels],
    }),

    // Bulk Reschedule Delivery
    bulkRescheduleDelivery: builder.mutation<any, { parcel_ids: string[] }>({
      query: (body: { parcel_ids: string[] }) => ({
        url: "/hubs/parcels/bulk-reschedule-delivery",
        method: "POST",
        body: {
          parcel_ids: body.parcel_ids,
        },
      }),
      invalidatesTags: [TAG_TYPES.Hubs, TAG_TYPES.Parcels],
    }),

    // Assign One Parcel to Carrybee
    // POST /carrybee/parcels/:parcelId/assign
    assignParcelToCarrybee: builder.mutation<
      AssignParcelToCarrybeeResponse,
      AssignParcelToCarrybeeParams
    >({
      query: ({ parcelId, provider_id, notes }) => ({
        url: `/carrybee/parcels/${parcelId}/assign`,
        method: "POST",
        body: {
          ...(provider_id ? { provider_id } : {}),
          ...(notes ? { notes } : {}),
        },
      }),
      invalidatesTags: [TAG_TYPES.Hubs, TAG_TYPES.Parcels],
    }),
  }),
});

export const {
  useGetReturnToMerchantQuery,
  useGetRescheduledDeliveriesQuery,
  useGetDeliveryOutcomesQuery,
  useBulkReturnToMerchantMutation,
  useBulkRescheduleDeliveryMutation,
  useAssignParcelToCarrybeeMutation,
} = processUnprocessApi;
