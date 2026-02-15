export interface Hub {
  id: string;
  branch_name: string;
}


export interface Rider {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  photo: string; // this is fileKey
  bike_type: "MOTORCYCLE" | "BICYCLE" | "SCOOTER" | "CAR";
  is_active: boolean;

  hub: Hub;

  guardian_mobile_no: string;
  nid_number: string;
  license_no: string;

  present_address: string;
  permanent_address: string;

  fixed_salary: string; // API returns string ("0.00")
  commission_per_delivery: string;

  created_at: string; // ISO date string
}


export interface RiderResponse {
  success: boolean;
  message: string;
  data: Rider;
}
