import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  HubsListResponse,
  HubMerchantsResponse,
  HubRidersResponse,
  MyHubResponse,
} from "./hubsTypes";


const hubsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    // get my hub
    getMyHub: builder.query<MyHubResponse, void>({
      query: () => ({
        url: "/hubs/my-hub",
        method: "GET",
      }),
    }),

    // get hubs list
    getHubsList: builder.query<HubsListResponse, void>({
      query: () => ({
        url: "/hubs/list",
        method: "GET",
      }),
    }),

    getHubMerchants: builder.query<HubMerchantsResponse, void>({
      query: () => ({
        url: "/hubs/merchants",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Merchants],
    }),

    getHubRiders: builder.query<HubRidersResponse, void>({
      query: () => ({
        url: "/hubs/riders",
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Riders],
    }),
    

    // initiate hub
  
  }),
});

export const {
  useGetHubsListQuery,
  useGetMyHubQuery,
  useGetHubMerchantsQuery,
  useGetHubRidersQuery,
} = hubsApi;
