import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  MerchantListResponse,
  MerchantOverviewResponse,
  MerchantPerformanceResponse,
} from "./merchantTypes";

const merchantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get assigned merchants list
    getAssignedMerchantsList: builder.query<MerchantListResponse, void>({
      query: () => ({
        url: "/merchants/hub/assigned",
        method: "GET",
      }),
    }),

    getMerchantsPerformance: builder.query<MerchantPerformanceResponse, void>({
      query: () => ({
        url: "/hubs/merchants/performance",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Merchants],
    }),

    // get merchant overview by id
    getMerchantOverview: builder.query<
      MerchantOverviewResponse,
      {
        id: string;
        range?: string;
        month?: string;
        start_date?: string;
        end_date?: string;
      }
    >({
      query: ({ id, range, month, start_date, end_date }) => ({
        url: `/merchants/${id}/overview`,
        params: {
          ...(range ? { range } : {}),
          ...(month ? { month } : {}),
          ...(start_date ? { start_date } : {}),
          ...(end_date ? { end_date } : {}),
        },
      }),
      providesTags: (result, error, { id }) => [
        { type: TAG_TYPES.Merchants, id },
        { type: TAG_TYPES.Merchants, id: "OVERVIEW" },
      ],
    }),
  }),
});

export const {
  useGetAssignedMerchantsListQuery,
  useGetMerchantOverviewQuery,
  useGetMerchantsPerformanceQuery,
} = merchantApi;
