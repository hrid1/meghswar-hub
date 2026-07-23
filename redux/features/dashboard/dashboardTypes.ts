export interface HubDashboardOverviewResponse {
    success: boolean;
    data: HubDashboardData;
    message: string;
  }
  
  export interface HubDashboardData {
    generated_at: string;
    date_context: DateContext;
    top_cards: TopCards;
    summary_for_todays_parcel: SummaryForTodaysParcel;
    pending_actions: PendingActions;
  }
  
  export interface DateContext {
    timezone: string;
    date: string;
    start: string;
    end_exclusive: string;
  }
  
  export interface TopCards {
    parcels_to_process: {
      value: number;
      received_last_hour: number;
    };
    riders_active: {
      value: number;
      total: number;
    };
    deliveries_in_progress: {
      value: number;
      average_per_active_rider: number;
    };
    live_success_rate: {
      value: number;
      unit: string;
      today_change: number;
      comparison: string;
    };
  }
  
  export interface SummaryForTodaysParcel {
    currency: string;
    new_parcels: ParcelSummaryItem;
    pick_up: ParcelSummaryItem;
    assigned: ParcelSummaryItem;
    delivered: ParcelSummaryItem;
    delivery_rescheduled: ParcelSummaryItem;
  }
  
  export interface ParcelSummaryItem {
    count: number;
    amount: number;
  }
  
  export interface PendingActions {
    counts: {
      otp_approval: number;
      rider_assignment: number;
      return_processing: number;
      total: number;
    };
    actions: PendingAction[];
  }
  
  export interface PendingAction {
    type: string;
    priority: string;
    count: number;
    title: string;
    description: string;
    reference: string | null;
    api_target: string;
  }
  


  export interface HubDashboardParcelFlowResponse {
    success: boolean;
    data: {
      range: {
        start_date: string;
        end_date: string;
        start: string;
        end_exclusive: string;
      };
      metrics: {
        parcels_received: number;
        parcels_dispatched: number;
        parcels_reported: number;
      };
    };
    message: string;
  }

export type RiderDashboardStatus = "on_duty" | "break" | "leave" | string;

export interface DashboardRiderStatusItem {
  id: string;
  rider_code: string | null;
  name: string;
  phone: string;
  photo: string | null;
  bike_type: string;
  status: RiderDashboardStatus;
  status_label: string;
  assigned_parcels_count: number;
  is_active: boolean;
  created_at: string;
}

export interface HubDashboardRiderStatusResponse {
  success: boolean;
  data: {
    counts: {
      all: number;
      on_duty: number;
      break: number;
      leave: number;
    };
    items: DashboardRiderStatusItem[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message: string;
}


// ================================================
// On Going Delivery
// ================================================

export interface HubDashboardParcelDetailResponse {
    success: boolean;
    data: HubDashboardParcelDetailData;
    message: string;
  }
  
  interface HubDashboardParcelDetailData {
    parcel_id: string;
    tracking_number: string;
    merchant_info: MerchantInfo;
    assigned_rider: AssignedRiderDetail;
    customer_info: CustomerInfoDetail;
    live_status_controls: LiveStatusControls;
    package_information: PackageInformation;
    financial_summary: FinancialSummary;
    parcel_details: ParcelDetails;
    enum_mappings: EnumMappings;
  }
  
  interface MerchantInfo {
    merchant_id: string;
    merchant_name: string;
    store_name: string;
    phone: string;
    address: string;
  }
  
  interface AssignedRiderDetail {
    id: string;
    rider_code: string | null;
    user_id: string;
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
    nid_front_photo: string | null;
    nid_back_photo: string | null;
    license_front_photo: string | null;
    license_back_photo: string | null;
    parent_nid_front_photo: string | null;
    parent_nid_back_photo: string | null;
    approval_status: string;
    approved_at: string | null;
    approved_by: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    full_name: string;
    phone: string;
    user: User;
    hub: Hub;
    approver: string | null;
    rider_status: string;
    assigned_parcels_count: number;
    rider_id: string;
    rider_name: string;
  }
  
  interface User {
    id: string;
    full_name: string;
    phone: string;
    email: string;
    role: string;
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
    status: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  interface CustomerInfoDetail {
    id: string;
    customer_name: string;
    phone_number: string;
    secondary_number: string;
    customer_address: string;
    delivery_coverage_area_id: string;
    created_at: string;
    updated_at: string;
    customer_id: string;
    phone: string;
    secondary_phone: string;
    address: string;
  }
  
  interface LiveStatusControls {
    current_status: string;
  }
  
  interface PackageInformation {
    product_description: string;
    special_instructions: string;
    admin_notes: string;
  }
  
  interface FinancialSummary {
    cod_amount: number;
    delivery_charge: number;
    weight_charge: number;
    cod_charge: number;
    discount: number;
    total_charge: number;
    total_payable: number;
  }
  
  interface ParcelDetails {
    parcel_weight: string;
    parcel_type: number;
    parcel_type_key: string;
    parcel_type_label: string;
    delivery_type: number;
    delivery_type_key: string;
    delivery_type_label: string;
    is_cod: boolean;
    is_exchange: boolean;
  }
  
  interface EnumMappings {
    parcel_type: EnumItem[];
    delivery_type: EnumItem[];
  }
  
  interface EnumItem {
    value: number;
    key: string;
    label: string;
  }

  // ================================================

export type DashboardDeliveryRider = {
    id: string;
    name: string;
    phone: string;
    photo: string | null;
    vehicle: "MOTORCYCLE" | string;
};

export type DashboardDeliveryDestination = {
    address: string;
    area: string;
    city: string | null;
    zone: string | null;
};

export type DashboardDeliveryActions = {
    can_view: boolean;
    can_call_rider: boolean;
};

export type DashboardOngoingDeliveryItem = {
    id: string;
    parcel_id: string;
    tracking_number: string;
    rider: DashboardDeliveryRider | null;
    destination: DashboardDeliveryDestination | null;
    status: string;
    status_label: string;
    actions: DashboardDeliveryActions;
    updated_at: string;
};

export type DashboardOngoingDeliveryPagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type DashboardOngoingDeliveriesData = {
    items: DashboardOngoingDeliveryItem[];
    pagination: DashboardOngoingDeliveryPagination;
};

export type HubDashboardOnGoingDeliveriesResponse = {
    success: boolean;
    data: DashboardOngoingDeliveriesData;
    message: string;
};
  
// ====================================================



// Merchant Info
interface MerchantInfo {
  merchant_id: string;
  merchant_name: string;
  store_name: string;
  phone: string;
  address: string;
}

// User (nested in rider)
interface RiderUser {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Hub (nested in rider)
interface RiderHub {
  id: string;
  hub_code: string;
  branch_name: string;
  area: string;
  address: string;
  manager_name: string;
  manager_phone: string;
  manager_user_id: string;
  status: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Assigned Rider (full details)
interface AssignedRider {
  id: string;
  rider_code: string | null;
  user_id: string;
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
  nid_front_photo: string | null;
  nid_back_photo: string | null;
  license_front_photo: string | null;
  license_back_photo: string | null;
  parent_nid_front_photo: string | null;
  parent_nid_back_photo: string | null;
  approval_status: string;
  approved_at: string | null;
  approved_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  full_name: string;
  phone: string;
  user: RiderUser;
  hub: RiderHub;
  approver: string | null;
  rider_status: string;
  assigned_parcels_count: number;
  rider_id: string;
  rider_name: string;
}

// Customer Info
interface CustomerInfo {
  id: string;
  customer_name: string;
  phone_number: string;
  secondary_number: string;
  customer_address: string;
  delivery_coverage_area_id: string;
  created_at: string;
  updated_at: string;
  customer_id: string;
  phone: string;
  secondary_phone: string;
  address: string;
}

// Live Status Controls
interface LiveStatusControls {
  current_status: string;
}

// Package Information
interface PackageInformation {
  product_description: string;
  special_instructions: string;
  admin_notes: string;
}

// Financial Summary
interface FinancialSummary {
  cod_amount: number;
  delivery_charge: number;
  weight_charge: number;
  cod_charge: number;
  discount: number;
  total_charge: number;
  total_payable: number;
}

// Parcel Details
interface ParcelDetails {
  parcel_weight: string;
  parcel_type: number;
  parcel_type_key: string;
  parcel_type_label: string;
  delivery_type: number;
  delivery_type_key: string;
  delivery_type_label: string;
  is_cod: boolean;
  is_exchange: boolean;
}

// Enum Mapping Item
interface EnumMappingItem {
  value: number;
  key: string;
  label: string;
}

// Enum Mappings
interface EnumMappings {
  parcel_type: EnumMappingItem[];
  delivery_type: EnumMappingItem[];
}

// Data (Single Parcel Detail)
export interface ParcelDetailData {
  parcel_id: string;
  tracking_number: string;
  merchant_info: MerchantInfo;
  assigned_rider: AssignedRider;
  customer_info: CustomerInfo;
  live_status_controls: LiveStatusControls;
  package_information: PackageInformation;
  financial_summary: FinancialSummary;
  parcel_details: ParcelDetails;
  enum_mappings: EnumMappings;
}

// Root Response
export interface ParcelDetailResponse {
  success: boolean;
  data: ParcelDetailData;
  message: string;
}