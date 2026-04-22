

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

export interface SingleRider extends Omit<Rider, "user"> {
  full_name: string;
  phone: string;
  email: string;
}

export interface RiderByIdResponse {
  success: boolean;
  message: string;
  data: SingleRider;
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