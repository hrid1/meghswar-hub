// Delivery area can be a string (legacy) or an object from API
export interface DeliveryArea {
  id: string;
  area: string;
  zone?: string;
  city?: string;
  division?: string;
}

/** Nested customer from `/hubs/parcels/for-assignment` (and similar) responses */
export interface ParcelCustomerNested {
  id?: string;
  customer_name?: string;
  phone_number?: string;
  secondary_number?: string | null;
  customer_address?: string;
}

// Define types for your parcel data
export interface Parcel {
    id: string;
    parcel_tx_id: string;
    tracking_number: string;
    merchant_order_id: string | null;
    /** Flattened fields; may mirror `customer` */
    customer_name: string;
    customer_phone: string;
    customer_secondary_phone: string | null;
    customer_address: string;
    customer?: ParcelCustomerNested | null;
    product_description: string;
    product_weight: string;
    total_charge: string;
    cod_amount: string;
    is_cod: boolean;
    status: string;
    delivery_type: number;
    created_at: string;
    store: {
      id: string;
      business_name: string;
    };
    delivery_area: string | DeliveryArea | null;
    /** Same shape as `delivery_area` when API sends both */
    delivery_coverage_area?: string | DeliveryArea | null;
    assigned_rider: string | null;
  }
  
  export interface GetParcelsForAssignmentResponse {
    data: {
      parcels: Parcel[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
  }





  // ===================================== HUBs Transfer =====================================


  // assigned parcels response
  export interface Store {
    id: string;
    store_code: string;
    merchant_id: string;
    business_name: string;
    business_address: string;
    phone_number: string;
    email: string;
    facebook_page: string;
    hub_id: string;
    is_default: boolean;
    status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | string; // Add other possible statuses
    district: string;
    thana: string;
    area: string;
    carrybee_store_id: string;
    carrybee_city_id: number;
    carrybee_zone_id: number;
    carrybee_area_id: number;
    is_carrybee_synced: boolean;
    carrybee_synced_at: string; // ISO date string
    auto_assign_to_carrybee: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
  export interface DestinationHub {
    id: string;
    hub_code: string;
    branch_name: string;
    area: string;
    address: string;
    manager_user_id: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }
  
  export interface Parcel2 {
    id: string;
    customer_id: string | null;
    customer: ParcelCustomerNested | null;
    merchant_id: string;
    store_id: string;
    store: Store;
    pickup_request_id: string | null;
    tracking_number: string;
    parcel_tx_id: string;
    merchant_order_id: string;
    delivery_area: string | DeliveryArea | null;
    delivery_coverage_area?: string | DeliveryArea | null;
    delivery_coverage_area_id: string | null;
    customer_name: string;
    customer_phone: string;
    customer_secondary_phone: string | null;
    customer_address: string;
    product_description: string;
    product_price: string; // Consider using number if API allows
    product_weight: string; // Consider using number if API allows
    parcel_type: number; // Likely enum values
    delivery_charge: string; // Consider using number
    weight_charge: string; // Consider using number
    cod_charge: string; // Consider using number
    total_charge: string; // Consider using number
    is_cod: boolean;
    cod_amount: string; // Consider using number
    is_exchange: boolean;
    receivable_amount: string; // Consider using number
    cod_collected_amount: string; // Consider using number
    return_charge: string; // Consider using number
    delivery_charge_applicable: boolean;
    return_charge_applicable: boolean;
    financial_status: 'PENDING' | 'PAID' | 'PROCESSING' | string;
    invoice_id: string | null;
    clearance_required: boolean;
    clearance_done: boolean;
    clearance_invoice_id: string | null;
    paid_amount: string | null; // Consider using number
    status: 'IN_TRANSIT' | 'PENDING' | 'DELIVERED' | 'RETURNED' | 'OUT_FOR_DELIVERY' | string; // Add all possible statuses
    payment_status: 'UNPAID' | 'PAID' | 'PARTIAL' | string;
    paid_to_merchant: boolean;
    paid_to_merchant_at: string | null; // ISO date string
    cod_cleared_at: string | null; // ISO date string
    delivery_type: number; // Likely enum (1 = normal, etc.)
    assigned_rider_id: string | null;
    assigned_at: string | null; // ISO date string
    rider_accepted_at: string | null; // ISO date string
    out_for_delivery_at: string | null; // ISO date string
    reschedule_count: number;
    special_instructions: string | null;
    admin_notes: string | null;
    return_reason: string;
    current_hub_id: string | null;
    origin_hub_id: string;
    destination_hub_id: string;
    destinationHub: DestinationHub;
    is_inter_hub_transfer: boolean;
    transferred_at: string; // ISO date string
    received_at_destination_hub: string | null; // ISO date string
    transfer_notes: string;
    delivery_provider: 'INTERNAL' | 'CARRYBEE' | 'THIRD_PARTY' | string;
    third_party_provider_id: string | null;
    issue_type: string | null;
    issue_description: string | null;
    issue_reported_by_id: string | null;
    issue_reported_at: string | null; // ISO date string
    is_issue_resolved: boolean;
    carrybee_consignment_id: string | null;
    carrybee_delivery_fee: string | null;
    carrybee_cod_fee: string | null;
    assigned_to_carrybee_at: string | null; // ISO date string
    recipient_carrybee_city_id: number | null;
    recipient_carrybee_zone_id: number | null;
    recipient_carrybee_area_id: number | null;
    original_parcel_id: string;
    is_return_parcel: boolean;
    picked_up_at: string | null; // ISO date string
    delivered_at: string | null; // ISO date string
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  }


  // For the specific endpoint you showed
export interface ParcelsListResponse {
  success: boolean;
  data: {
    parcels: Parcel2[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message: string;
}

// // Generic paginated response wrapper
// interface PaginatedResponse<T> {
//   success: boolean;
//   data: {
//     items: T[];
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   };
//   message: string;
// }

export interface ThirdPartyProvider {
  id: string;
  provider_code: string;
  provider_name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetThirdPartyProvidersResponse {
  success: boolean;
  data: {
    providers: ThirdPartyProvider[];
  };
  message: string;
}

//   {
//     "success": true,
//     "data": {
//         "providers": [
//             {
//                 "id": "316d6d72-dafb-4150-a03a-08661af29e70",
//                 "provider_code": "CARRYBEE",
//                 "provider_name": "Carrybee Courier",
//                 "description": "Standard delivery integration via API",
//                 "is_active": true,
//                 "created_at": "2026-01-25T19:28:54.116Z",
//                 "updated_at": "2026-01-25T19:28:54.116Z"
//             }
//         ]
//     },
//     "message": "Active providers retrieved successfully",
//     "timestamp": "2026-03-12T14:49:04.527Z"
// }


export interface HubChargesRequest {
  delivery_charge?: number;
  weight_charge?: number;
}

export interface HubChargesResponse {
  success: boolean;
  data: {
    id: string;
    parcel_tx_id: string;
    tracking_number: string;
    total_charge: number;
  };
  message: string;
  timestamp: string;
}


//====================== parcel reports =================================

// Customer interface
interface Customer {
  name: string;
  phone: string;
  address: string;
}

// Merchant interface
interface Merchant {
  name: string;
  company: string;
  phone: string;
}

// Reported by (rider) interface
interface ReportedBy {
  name: string;
  photo: string; // URL to photo
}

// Report details interface
interface Report {
  type: string; // e.g., "INCORRECT_PHONE"
  reason: string;
  reported_at: string; // ISO date string
}

// Individual parcel report interface
interface ParcelReport {
  id: string; // UUID
  tracking_number: string;
  customer: Customer;
  merchant: Merchant;
  zone: string;
  reported_by: ReportedBy;
  report: Report;
}

// Pagination interface
interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Main API response interface
export interface ParcelReportsResponse {
  success: boolean;
  data: ParcelReport[];
  pagination: Pagination;
  message: string;
}


// ===================================== Parcel Details =====================================
export interface ParcelDetailResponse {
  success: boolean;
  data: ParcelData;
  message: string;
}

export interface ParcelData {
  parcel_id: string;
  tracking_number: string;
  merchant_info: MerchantInfo;
  assigned_rider: AssignedRider | null;
  customer_info: CustomerInfo;
  live_status_controls: LiveStatusControls;
  package_information: PackageInformation;
  financial_summary: FinancialSummary;
  parcel_details: ParcelDetails;
  enum_mappings: EnumMappings;
}

export interface MerchantInfo {
  merchant_id: string;
  merchant_name: string;
  store_name: string;
  phone: string;
  address: string;
}

export interface AssignedRider {
  rider_id: string;
  rider_name: string;
  phone: string;
}

export interface CustomerInfo {
  customer_id: string;
  customer_name: string;
  phone_number: string;
  customer_address: string;
}

export interface LiveStatusControls {
  current_status: string;
}

export interface PackageInformation {
  product_description: string;
  special_instructions: string | null;
  admin_notes: string | null;
}

export interface FinancialSummary {
  cod_amount: number;
  delivery_charge: number;
  weight_charge: number;
  cod_charge: number;
  discount: number;
  total_charge: number;
  total_payable: number;
}

export interface ParcelDetails {
  parcel_weight: number;
  parcel_type: number;
  parcel_type_key: string;
  parcel_type_label: string;
  delivery_type: number;
  delivery_type_key: string;
  delivery_type_label: string;
  is_cod: boolean;
  is_exchange: boolean;
}

export interface EnumOption {
  value: number;
  key: string;
  label: string;
}

export interface EnumMappings {
  parcel_type: EnumOption[];
  delivery_type: EnumOption[];
}