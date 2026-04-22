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