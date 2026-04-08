import { baseApi } from "../api/baseApi";
import { HubsListResponse } from "./hubsTypes";


const hubsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get hubs list
    getHubsList: builder.query<HubsListResponse, void>({
      query: () => ({
        url: "/hubs/list",
        method: "GET",
      }),
    }),
    

    // in hub
  
  }),
});

export const { useGetHubsListQuery } = hubsApi;