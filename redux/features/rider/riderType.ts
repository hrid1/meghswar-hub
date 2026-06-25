

interface Rider {
  id: string;
  rider_code: string;
  user_id: string;
  hub_id: string;
  photo: string | null;
  guardian_mobile_no: string;
  bike_type: "MOTORCYCLE" | "SCOOTER" | "BICYCLE"; // adjust enum as needed
  nid_number: string;
  license_no: string;
  present_address: string;
  permanent_address: string;
  fixed_salary: string; // or number if parsed
  commission_per_delivery: string; // or number
  bank_name: string | null;
  bank_account_number: string | null;
  bank_branch: string | null;
  nid_front_photo: string;
  nid_back_photo: string;
  license_front_photo: string;
  license_back_photo: string;
  parent_nid_front_photo: string;
  parent_nid_back_photo: string;
  approval_status: "PENDING" | "APPROVED" | "REJECTED"; // adjust enum
  approved_at: string | null;
  approved_by: string | null;
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  user: User;
  hub: Hub;
  approver: null; // or expand if approver data exists
}

interface User {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: "RIDER" | "ADMIN" | "MANAGER"; // adjust as needed
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Hub {
  id: string;
  hub_code: string;
  branch_name: string;
  area: string;
  address: string;
  manager_name: string;
  manager_phone: string;
  manager_user_id: string;
  status: "ACTIVE" | "INACTIVE";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// "total": 2,
// "page": 1,
// "limit": 20,
// "totalPages": 1


interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RiderResponse {
  success: boolean;
  message: string;
  data: {
    riders: Rider[];
    pagination: Pagination;
  };
}

// export interface SingleRider extends Omit<Rider, "user"> {
//   full_name: string;
//   phone: string;
//   email: string;
// }

// export interface RiderByIdResponse {
//   success: boolean;
//   message: string;
//   data: SingleRider;
// }

export interface RiderByIdResponse {
  success: boolean;
  data: RiderData;
  message: string;
}

export interface RiderData {
  id: string;
  rider_code: string | null;
  user_id: string;
  hub_id: string;
  photo: string | null;
  guardian_mobile_no: string;
  bike_type: "MOTORCYCLE" | "SCOOTER" | "BICYCLE";
  nid_number: string;
  license_no: string;
  present_address: string;
  permanent_address: string;
  fixed_salary: string;
  commission_per_delivery: string;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_branch: string | null;
  nid_front_photo: string | null;
  nid_back_photo: string | null;
  license_front_photo: string | null;
  license_back_photo: string | null;
  parent_nid_front_photo: string | null;
  parent_nid_back_photo: string | null;
  approval_status: "PENDING" | "APPROVED" | "REJECTED";
  approved_at: string | null;
  approved_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user: RiderUser;
  hub: RiderHub;
  approver: null;
}

export interface RiderUser {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: "RIDER" | "ADMIN" | "MANAGER";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RiderHub {
  id: string;
  hub_code: string;
  branch_name: string;
  area: string;
  address: string;
  manager_name: string;
  manager_phone: string;
  manager_user_id: string;
  status: "ACTIVE" | "INACTIVE";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RiderPerformanceItem {
  rider_id: string;
  rider_name: string;
  rider_phone: string;
  photo: string | null;
  delivered: number;
  rescheduled: number;
  returned: number;
  assigned: number;
  commission: number;
  success_rate: number;
  last_delivery_date: string | null;
}

export interface RiderPerformanceResponse {
  success: boolean;
  message: string;
  data: {
    total_active_riders: number;
    overall_success_rate: number;
    total_delivered: number;
    total_rescheduled: number;
    total_returned: number;
    total_assigned: number;
    riders: RiderPerformanceItem[];
    pagination: Pagination;
  };
}

export interface RiderPerformanceParams {
  period?: "this_week" | "this_month" | "last_month" | "custom";
  search?: string;
  riderId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// ─── Delivery Verification ────────────────────────────────────────────────────

export interface PendingHubApproval {
  id: string;
  parcel_id: string;
  rider_id: string;
  rider_name: string;
  rider_phone: string;
  merchant_name: string;
  merchant_phone: string;
  tracking_id: string;
  status: string;
  otp_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PendingHubApprovalsResponse {
  success: boolean;
  message: string;
  data: {
    verifications: PendingHubApproval[];
    pagination: Pagination;
  };
}

export interface PendingHubApprovalsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export type HubApprovalAction = "approve" | "decline";

export interface HubApprovalRequest {
  id: string;
  action: HubApprovalAction;
}

export interface HubApprovalResponse {
  success: boolean;
  message: string;
  data: PendingHubApproval;
}


// Add these to your riderType.ts file

// ─── Rider Transfer Types ────────────────────────────────────────────────────

export interface RiderTransferRider {
  id: string;
  rider_code: string | null;
  full_name: string;
  phone: string;
  photo: string | null;
  rider_status: "On Duty" | "Break" | "Off Duty" | "On Leave";
  license_no: string;
  assigned_parcels_count: number;
  is_active: boolean;
  hub: {
    id: string;
    branch_name: string;
  };
  bike_type?: "MOTORCYCLE" | "SCOOTER" | "BICYCLE"; // Only present in available riders response
}

export interface RiderTransferCustomerInfo {
  name: string;
  phone: string;
  secondary_phone: string | null;
  full_address: string;
}

export interface RiderTransferDeliveryArea {
  id: string;
  area: string;
  zone: string;
  city: string;
  division: string;
}

export interface RiderTransferMerchant {
  id: string;
  name: string;
  phone: string;
  photo: string | null;
}

export interface RiderTransferAmount {
  total_amount: number;
  delivery_charge: number;
  cod_charge: number;
  weight_charge: number;
  discount: number;
  cod_amount: number;
  receivable_amount: number;
}

export interface RiderTransferParcel {
  id: string;
  parcel_id: string;
  parcel_tx_id: string;
  tracking_number: string;
  status: string;
  customer_info: RiderTransferCustomerInfo;
  additional_notes: string | null;
  area: string;
  delivery_area: RiderTransferDeliveryArea;
  merchant: RiderTransferMerchant;
  amount: RiderTransferAmount;
  parcel_age: string;
  age_days: number;
  delivery_type: number;
  is_cod: boolean;
  created_at: string;
  last_updated: string;
  assigned_at: string;
}

// Response Types
export interface RidersForTransferResponse {
  success: boolean;
  message: string;
  data: {
    riders: RiderTransferRider[];
    pagination: Pagination;
  };
}

export interface AvailableRidersForTransferResponse {
  success: boolean;
  message: string;
  data: {
    riders: RiderTransferRider[];
  };
}

export interface RiderParcelsForTransferResponse {
  success: boolean;
  message: string;
  data: {
    rider: {
      id: string;
      rider_code: string | null;
      full_name: string;
      phone: string;
      photo: string | null;
      hub: {
        id: string;
        branch_name: string;
      };
    };
    parcels: RiderTransferParcel[];
    pagination: Pagination;
  };
}

export interface TransferResult {
  parcel_id: string;
  parcel_tx_id: string;
  tracking_number: string;
  success: boolean;
  error?: string;
}

export interface TransferSummary {
  total: number;
  transferred: number;
  failed: number;
}

export interface TransferParcelsResponse {
  success: boolean;
  message: string;
  data: {
    summary: TransferSummary;
    results: TransferResult[];
  };
}

// Request Types
export interface GetRidersForTransferParams {
  page?: number;
  limit?: number;
}

export interface GetAvailableRidersForTransferParams {
  exclude_rider_ids?: string[];
}

export interface TransferParcelsRequest {
  target_rider_id: string;
  parcel_ids: string[];
  notes?: string;
}