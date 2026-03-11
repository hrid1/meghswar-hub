import { baseApi } from "../api/baseApi";
import { HubsListResponse } from "./hubsTypes";


const hubsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHubsList: builder.query<HubsListResponse, void>({
      query: () => ({
        url: "/hubs/list",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHubsListQuery } = hubsApi;