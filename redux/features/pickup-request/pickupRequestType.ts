export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ─── Pickup Request List ──────────────────────────────────────────────────────

export interface PickupRequest {
  id: string;
  request_code: string;
  pickup_location: string;
  store_name: string;
  store_phone: string;
  comment: string | null;
  pickup_count: number;
  status: "PENDING" | "ASSIGNED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  assigned_rider_id: string | null;
}

export interface PickupRequestListData {
  pickupRequests: PickupRequest[];
  pagination: Pagination;
}

export type PickupRequestListResponse = ApiResponse<PickupRequestListData>;

// ─── Accepted Pickups (/pickup-requests/hub/accepted-pickups) ─────────────────

export interface AcceptedPickupMerchant {
  id: string;
  user_id: string;
  thana: string;
  district: string;
  full_address: string;
  secondary_number: string;
  status: string;
  is_advance_payment_disabled: boolean;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface AcceptedPickupStore {
  id: string;
  store_code: string;
  merchant_id: string;
  business_name: string;
  business_address: string;
  phone_number: string;
  email: string;
  facebook_page: string | null;
  hub_id: string;
  is_default: boolean;
  status: string;
  district: string;
  thana: string;
  area: string;
  created_at: string;
  updated_at: string;
}

export interface AcceptedPickupRiderUser {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AcceptedPickupRider {
  id: string;
  rider_code: string;
  user_id: string;
  user: AcceptedPickupRiderUser;
  hub_id: string;
  photo: string | null;
  guardian_mobile_no: string;
  bike_type: string;
  nid_number: string;
  license_no: string;
  present_address: string;
  permanent_address: string;
  fixed_salary: string;
  commission_per_delivery: string;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_branch: string | null;
  approval_status: "PENDING" | "APPROVED" | "REJECTED";
  approved_at: string | null;
  approved_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AcceptedPickup {
  id: string;
  request_code: string;
  merchant_id: string;
  merchant: AcceptedPickupMerchant;
  store_id: string;
  store: AcceptedPickupStore;
  hub_id: string;
  assigned_rider_id: string | null;
  assignedRider: AcceptedPickupRider | null;
  rider_assigned_at: string | null;
  completed_by_rider_id: string | null;
  estimated_parcels: number;
  actual_parcels: number;
  picked_up_count: number;
  comment: string | null;
  status: string;
  requested_at: string;
  confirmed_at: string | null;
  picked_up_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AcceptedPickupListData {
  pickupRequests: AcceptedPickup[];
  pagination: Pagination;
}

export type AcceptedPickupResponse = ApiResponse<AcceptedPickupListData>;

// ─── Confirmed Pickups (/pickup-requests/hub/confirmed-pickups) ───────────────

export interface ConfirmedPickupRider {
  id: string;
  name: string;
  phone: string;
}

export interface ConfirmedPickup {
  id: string;
  request_code: string;
  pickup_location: string;
  store_name: string;
  store_phone: string;
  comment: string | null;
  pickup_count: number;
  status: "PICKED_UP" | "DELIVERED" | "CANCELLED" | "CONFIRMED";
  rider: ConfirmedPickupRider | null;
  completed_at: string | null;
  date: string;
}

export interface ConfirmedPickupListData {
  pickupRequests: ConfirmedPickup[];
  pagination: Pagination;
}

export type ConfirmedPickupResponse = ApiResponse<ConfirmedPickupListData>;
