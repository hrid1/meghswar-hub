export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


export interface PickupRequest {
  id: string;
  request_code: string;
  pickup_location: string;
  store_name: string;
  store_phone: string;
  comment: string | null;
  pickup_count: number;
  status: "PENDING" | "ASSIGNED" | "COMPLETED" | "CANCELLED"; // adjust if backend has more
  assigned_rider_id: string | null;
}


export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PickupRequestListData {
  pickupRequests: PickupRequest[];
  pagination: Pagination;
}

export type PickupRequestListResponse = ApiResponse<PickupRequestListData>;



export interface ConfirmedPickupRider {
  id: string;
  name: string;
  phone: string;
}
export interface ConfirmedPickup {
  id: string;
  request_code: string;
  request_codes: string[];
  pickup_location: string;
  store_name: string;
  store_phone: string;
  comment: string | null;
  pickup_count: number;
  status: "PICKED_UP" | "DELIVERED" | "CANCELLED";
  rider: ConfirmedPickupRider;
  completed_at: string;
  date: string;
}
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
export interface ConfirmedPickupListData {
  pickupRequests: ConfirmedPickup[];
  pagination: Pagination;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type ConfirmedPickupResponse =
  ApiResponse<ConfirmedPickupListData>;
