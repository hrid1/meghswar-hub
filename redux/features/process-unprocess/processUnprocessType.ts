export interface RescheduledDeliveriesResponse {
    success: boolean;
    data: {
      parcels: RescheduledParcel[];
      pagination: Pagination;
    };
    message: string;
  }
  
  export interface DeliveryCoverageArea {
    id?: string;
    city?: string;
    zone?: string;
    area?: string;
    division?: string;
  }

  export interface RescheduledParcel {
    parcel_id: string;
    parcel_tx_id: string;
    tracking_number: string;
    merchant_order_id?: string | null;
    status: string; // "DELIVERY_RESCHEDULED"
    reason?: string | null;
    destination?: string;
    zone?: string;
    customer_name?: string | null;
    customer_phone?: string | null;
    customer_secondary_phone?: string | null;
    customer_address?: string | null;
    delivery_coverage_area?: DeliveryCoverageArea | null;
    store?: Store | null;
    cod_breakdown?: CodBreakdown | null;
    age?: Age | null;
    created_at?: string | null;
    updated_at?: string | null;
    received_at?: string | null;
    reschedule_count?: number;
    cod_amount?: number;
  }
  
  // Reusable interfaces
  export interface Store {
    name: string;
    phone: string;
  }
  
  export interface CodBreakdown {
    cod_amount: number;
    cod_collected_amount: number;
    delivery_charge: number;
    cod_charge: number;
    weight_charge: number;
    return_charge: number;
    total_charge: number;
  }
  
  export interface Age {
    total_age: string;
    created_at?: string | null;
    updated_at?: string | null;
    received_at?: string | null;
  }
  
  export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }





  export interface DeliveryOutcomesResponse {
    success: boolean;
    data: {
      parcels: DeliveryOutcomeParcel[];
      pagination: Pagination;
      summary: DeliveryOutcomeSummary;
    };
    message: string;
  }
  
  export interface DeliveryOutcomeParcel {
    parcel_id: string;
    parcel_tx_id: string;
    tracking_number: string;
    status: DeliveryOutcomeStatus; // "PARTIAL_DELIVERY" | "EXCHANGE" | "DELIVERED"
    reason: string;
    destination: string;
    zone: string;
    store: Store;
    cod_breakdown: CodBreakdown;
    age: Age;
  }
  
  export type DeliveryOutcomeStatus = 
    | "PARTIAL_DELIVERY"
    | "EXCHANGE" 
    | "DELIVERED"
    | string; // Allow for other status values
  
  export interface DeliveryOutcomeSummary {
    total_collectable_amount: number;
    // Note: total_cleared_parcels is not present in this response
  }
  
  // Reusable interfaces
  export interface Store {
    name: string;
    phone: string;
  }
  
  export interface CodBreakdown {
    cod_amount: number;
    cod_collected_amount: number;
    delivery_charge: number;
    cod_charge: number;
    weight_charge: number;
    return_charge: number;
    total_charge: number;
  }
  
  export interface Age {
    total_age: string;
    created_at?: string | null;
    updated_at?: string | null;
    received_at?: string | null;
  }
  
  export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }

  // =============== Return to Merchant ===============

  // Main response type
export interface ReturnToMerchantResponse {
  success: boolean;
  data: {
    parcels: ReturnParcel[];
    pagination: Pagination;
  };
  message: string;
}

// Individual parcel type
export interface ReturnParcel {
  parcel_id: string;
  parcel_tx_id: string;
  tracking_number: string;
  status: string; // You can make this more specific if you have predefined statuses
  reason: string;
  destination: string;
  zone: string;
  store: Store;
  cod_breakdown: CodBreakdown;
  age: Age;
  return_parcel: ReturnParcelInfo;
}

// Store information
export interface Store {
  name: string;
  phone: string;
}

// COD (Cash on Delivery) breakdown
export interface CodBreakdown {
  cod_amount: number;
  cod_collected_amount: number;
  delivery_charge: number;
  cod_charge: number;
  weight_charge: number;
  return_charge: number;
  total_charge: number;
}

// Age/timing information
export interface Age {
  total_age: string;
  created_at?: string | null;
  updated_at?: string | null;
  received_at?: string | null;
}

// Return parcel information
export interface ReturnParcelInfo {
  id: string;
  parcel_tx_id: string;
  tracking_number: string;
  status: string;
}

// Pagination information
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// If you want more specific status types (optional)
export type ParcelStatus = 
  | "RETURN_TO_MERCHANT"
  | "PARTIAL_DELIVERY"
  | "DELIVERED"
  | "IN_HUB"
  | "PENDING"
  | "CANCELLED"
  | string; // fallback for other statuses

// Updated ReturnParcel with specific status type
export interface ReturnParcelWithSpecificStatus extends Omit<ReturnParcel, 'status'> {
  status: ParcelStatus;
}

// For the return_parcel status
export type ReturnParcelStatus = 
  | "IN_HUB"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "RETURNED"
  | string;

// Updated ReturnParcelInfo with specific status type
export interface ReturnParcelInfoWithSpecificStatus extends Omit<ReturnParcelInfo, 'status'> {
  status: ReturnParcelStatus;
}