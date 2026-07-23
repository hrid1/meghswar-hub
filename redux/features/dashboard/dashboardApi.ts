import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import {
  HubDashboardOverviewResponse,
  HubDashboardParcelFlowResponse,
  HubDashboardRiderStatusResponse,
  HubDashboardParcelDetailResponse,
  HubDashboardOnGoingDeliveriesResponse,
  ParcelDetailResponse,
} from "./dashboardTypes";



const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

    // get dashboard stats
    getDashboardOverviewStats: builder.query<HubDashboardOverviewResponse, void>({
      query: () => "/hubs/dashboard/overview",
      providesTags: [TAG_TYPES.Dashboard],
    }),

    // get dashboard parcel flow
    getDashboardParcelFlow: builder.query<HubDashboardParcelFlowResponse, void>({
      query: () => "/hubs/dashboard/parcel-flow",
      providesTags: [TAG_TYPES.Dashboard],
    }),

    getDashboardRiderStatus: builder.query<
      HubDashboardRiderStatusResponse,
      void
    >({
      query: () => "/hubs/dashboard/rider-status",
      providesTags: [TAG_TYPES.Dashboard],
    }),

    getDashboardOnGoingDelivery: builder.query<
      HubDashboardParcelDetailResponse,
      void
    >({
      query: () => "/hubs/dashboard/on-going-delivery",
      providesTags: [TAG_TYPES.Dashboard],
    }),

    // hubs/dashboard/ongoing-deliveries
    getDashboardOnGoingDeliveries: builder.query<
      HubDashboardOnGoingDeliveriesResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/hubs/dashboard/ongoing-deliveries",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
        },
      }),
      providesTags: [TAG_TYPES.Dashboard],
    }),


    // /hubs/dashboard/parcels/:id
    getDashboardParcelDetail: builder.query<
      HubDashboardParcelDetailResponse,
      { id: string }
    >({
      query: ({ id }) => `/hubs/dashboard/parcels/${id}`,
      providesTags: [TAG_TYPES.Dashboard],
    }),


    // parcel details
    getParcelDetails: builder.query<
    ParcelDetailResponse,
      { id: string }
    >({
      query: ({ id }) => `/hubs/dashboard/parcel-details/${id}`,
      providesTags: [TAG_TYPES.Dashboard],
    }),
  }),
});

export const {
  useGetDashboardOverviewStatsQuery,
  useGetDashboardParcelFlowQuery,
  useGetDashboardRiderStatusQuery,
  useGetDashboardOnGoingDeliveriesQuery,
  useGetParcelDetailsQuery,
} = dashboardApi;