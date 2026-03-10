import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import { ClearedDeliveryResponse, CollectedCODAmountResponse } from "./FinancialReportType";



const financialReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get COD management list
    getCodManagementList: builder.query<ClearedDeliveryResponse, { riderId: string }>({
      query: ({ riderId }) =>
        `/hubs/parcels/cleared-deliveries?rider_id=${riderId}`,
      providesTags: [TAG_TYPES.FinancialReport],
    }),

    // collect COD amount
    collectedCODAmount: builder.mutation<
      CollectedCODAmountResponse,   
      { riderId: string; counted_amount: number }
    >({
      query: ({ riderId, counted_amount }) => ({
        url: `/hubs/finance/collect-cod/${riderId}`,
        method: "POST",
        body: { counted_amount: counted_amount },
      }),
      invalidatesTags: [TAG_TYPES.FinancialReport],
    }),
  }),
});

export const { useGetCodManagementListQuery, useCollectedCODAmountMutation } = financialReportApi;


