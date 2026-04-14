import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import { ClearedDeliveryResponse, CollectedCODAmountResponse, CreateTransferRequest, CreateTransferResponse, FinancialDashboardStatsResponse, TransferHistoryResponse } from "./FinancialReportType";



const financialReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // get financial dashboard stats
    getFinancialDashboardStats: builder.query<FinancialDashboardStatsResponse, void>({
      query: () => "/hubs/finance/overview",
      providesTags: [TAG_TYPES.FinancialReport],
    }),

    //get transfer history
    getTransferHistory: builder.query<TransferHistoryResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/hubs/finance/transfers?page=${page}&limit=${limit}`,
      providesTags: [TAG_TYPES.FinancialReport],
    }),

    // create transfer
    createTransfer: builder.mutation<CreateTransferResponse, CreateTransferRequest>({
      query: (body: CreateTransferRequest) => ({
        url: "/hubs/finance/transfer",
        method: "POST", 
        body: body,
      }),
      invalidatesTags: [TAG_TYPES.FinancialReport],
    }),
    



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

export const { useGetCodManagementListQuery, useCollectedCODAmountMutation, useGetFinancialDashboardStatsQuery, useGetTransferHistoryQuery } = financialReportApi;


