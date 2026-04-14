import { baseApi } from "../api/baseApi";
import { HubsListResponse, MyHubResponse } from "./hubsTypes";


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
    

    // initiate hub
  
  }),
});

export const { useGetHubsListQuery, useGetMyHubQuery } = hubsApi;