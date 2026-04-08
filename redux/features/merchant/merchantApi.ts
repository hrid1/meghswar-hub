import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  MerchantListResponse,
  MerchantOverviewResponse,
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

    // get merchant overview by id
    getMerchantOverview: builder.query<
      MerchantOverviewResponse,
      {
        id: string;
        range?: string; // e.g., "last7d", "last30d", "last90d"
      }
    >({
      query: ({ id, range = "last7d" }) => ({
        url: `/merchants/${id}/overview`,
        params: { range },
      }),
      providesTags: (result, error, { id }) => [
        { type: TAG_TYPES.Merchants, id },
        { type: TAG_TYPES.Merchants, id: "OVERVIEW" },
      ],
    }),
  }),
});

export const { useGetAssignedMerchantsListQuery, useGetMerchantOverviewQuery } =
  merchantApi;
