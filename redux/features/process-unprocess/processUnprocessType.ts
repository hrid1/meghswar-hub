// Shared Reverse Entry Types
export interface ReverseEntryZone {
  id?: number | string;
  name?: string;
  area_id?: number | string;
  area_name?: string;
  city_id?: number | string;
  city_name?: string;
  pricing_zone?: string | null;
}

export interface ReverseEntryStore {
  id?: string;
  name?: string;
  phone?: string;
  address?: string;
  is_default?: boolean;
  zone?: ReverseEntryZone;
}

export interface ReverseEntryMerchant {
  id?: string;
  name?: string;
  phone?: string;
  image?: string | null;
  stores?: ReverseEntryStore[];
}

export interface ReverseEntryCharges {
  cod_amount?: number;
  delivery_charge?: number;
  cod_charge?: number;
  weight_charge?: number;
  discount?: number;
  return_charge?: number;
  total_charge?: number;
  cod_collected_amount?: number;
}

export interface ReverseEntryAge {
  display?: string;
  total_age?: string;
  created_at?: string | null;
  updated_at?: string | null;
  received_at?: string | null;
}

export interface ReverseEntryPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Backwards compatibility aliases
export type Pagination = ReverseEntryPagination;
export type Store = ReverseEntryStore;
export type CodBreakdown = ReverseEntryCharges;
export type Age = ReverseEntryAge;
export type DeliveryCoverageArea = ReverseEntryZone;

// =============== Unprocessed Delivery Outcomes ===============

export type DeliveryOutcomeStatus =
  | "RETURNED"
  | "PAID_RETURN"
  | "EXCHANGE"
  | "PARTIAL_DELIVERY"
  | "DELIVERED"
  | string;

export interface DeliveryOutcomeCustomer {
  name?: string;
  phone?: string;
}

export interface DeliveryOutcomeParcel {
  id: string; // parcel UUID
  merchant_order_id?: string | null;
  parcel_tx_id?: string;
  reason?: string | null;
  destination?: string;
  zone?: ReverseEntryZone | string;
  merchant?: ReverseEntryMerchant;
  status: DeliveryOutcomeStatus;
  charges?: ReverseEntryCharges;
  age?: ReverseEntryAge;
  customer?: DeliveryOutcomeCustomer;
  attempt?: number;
  created_at?: string | null;
  updated_at?: string | null;
  last_updated?: string | null;

  // Fallbacks
  parcel_id?: string;
  tracking_number?: string;
  store?: { name: string; phone: string };
  cod_breakdown?: ReverseEntryCharges;
}

export interface DeliveryOutcomeSummary {
  total_collectable_amount?: number;
}

export interface DeliveryOutcomesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: DeliveryOutcomeStatus;
  zone?: string;
  merchantId?: string;
  customerName?: string;
  customerPhone?: string;
  merchantName?: string;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

export interface DeliveryOutcomesResponse {
  success: boolean;
  data: {
    parcels: DeliveryOutcomeParcel[];
    pagination: ReverseEntryPagination;
    summary?: DeliveryOutcomeSummary;
  };
  message: string;
}

// =============== Rescheduled Deliveries ===============

export interface RescheduledParcel {
  id: string; // parcel UUID
  parcel_tx_id?: string;
  reason?: string | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_secondary_phone?: string | null;
  customer_address?: string | null;
  destination?: string;
  zone?: ReverseEntryZone | string;
  merchant_name?: string;
  merchant_phone?: string;
  merchant_image?: string | null;
  merchant?: ReverseEntryMerchant;
  status: string; // "DELIVERY_RESCHEDULED"
  charges?: ReverseEntryCharges;
  attempt?: number;
  reschedule_count?: number;
  age?: ReverseEntryAge;
  created_at?: string | null;
  updated_at?: string | null;
  last_updated?: string | null;

  // Fallbacks
  parcel_id?: string;
  merchant_order_id?: string | null;
  delivery_coverage_area?: any;
  store?: { name: string; phone: string };
  cod_amount?: number;
  cod_breakdown?: ReverseEntryCharges;
  tracking_number?: string;
}

export interface RescheduledDeliveriesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  zone?: string;
  merchantId?: string;
  storeId?: string;
  customerName?: string;
  customerPhone?: string;
  merchantName?: string;
  area?: string;
  minAmount?: number;
  maxAmount?: number;
  deliveryType?: string;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

export interface RescheduledDeliveriesResponse {
  success: boolean;
  data: {
    parcels: RescheduledParcel[];
    pagination: ReverseEntryPagination;
  };
  message: string;
}

// =============== Return to Merchant ===============

export interface ReturnParcelInfo {
  id: string;
  parcel_tx_id?: string;
  tracking_number?: string;
  status?: string;
}

export interface ReturnParcel {
  id: string; // original parcel UUID
  merchant_order_id?: string | null;
  original_parcel_id?: string;
  new_parcel_id?: string;
  destination?: string;
  zone?: ReverseEntryZone | string;
  merchant_name?: string;
  merchant_phone?: string;
  merchant_image?: string | null;
  merchant?: ReverseEntryMerchant;
  status: string; // "RETURN_TO_MERCHANT"
  charges?: ReverseEntryCharges;
  age?: ReverseEntryAge;
  created_at?: string | null;
  updated_at?: string | null;
  last_updated?: string | null;
  return_parcel?: ReturnParcelInfo;

  // Fallbacks
  parcel_id?: string;
  parcel_tx_id?: string;
  tracking_number?: string;
  reason?: string;
  store?: { name: string; phone: string };
  cod_breakdown?: ReverseEntryCharges;
}

export interface ReturnToMerchantQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  zone?: string;
  merchantId?: string;
  customerName?: string;
  customerPhone?: string;
  merchantName?: string;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

export interface ReturnToMerchantResponse {
  success: boolean;
  data: {
    parcels: ReturnParcel[];
    pagination: ReverseEntryPagination;
  };
  message: string;
}

// =============== Carrybee Assignment ===============

export interface AssignParcelToCarrybeeParams {
  parcelId: string;
  provider_id?: string;
  notes?: string;
}

export interface AssignParcelToCarrybeeResponse {
  success: boolean;
  data: {
    parcel_id: string;
    carrybee_consignment_id: string;
    delivery_fee: number;
    cod_fee: number;
  };
  message: string;
  timestamp: string;
}
