

export interface Merchant {
    id: string;
    full_name: string;
    phone: string;
    email: string;
    thana?: string;
    district?: string;
    status: string;
    created_at?: string;
    business_name?: string;
    address?: string;
}

export interface Merchant2 {
    id: string;
    full_name: string;
    phone: string;
    email: string;
    business_name: string;
    address: string;
   
  }

export interface MerchantListResponse { 
    success: boolean;
    data: Merchant[];
    count: number;
    message: string;
}


export type MerchantOverviewRangeMode = "last7d" | "month" | "custom";

export interface MerchantOverviewParams {
  id: string;
  range?: string;
  month?: string;
  start_date?: string;
  end_date?: string;
}

interface MerchantOverviewResponse {
  success: boolean;
  data: MerchantOverviewData;
  message: string;
}

interface ParcelFlowTotals {
  received_count: number;
  received_value: number;
  platform_charge: number;
  currency: string;
}

interface MerchantOverviewData {
  merchant: Merchant;
  store_count?: number;
  parcel_totals?: ParcelTotals;
  parcel_flow_totals?: ParcelFlowTotals;
  graph: GraphDataPoint[];
  range?: string;
  range_start?: string;
  range_end?: string;
}

interface ParcelTotals {
  total: number;
  delivered: number;
  returned: number;
  reported: number;
}

interface GraphDataPoint {
  bucket: string;
  received_count?: number;
  received_value?: number;
  platform_charge?: number;
  count?: number;
}

export type {
  MerchantOverviewResponse,
  MerchantOverviewData,
  ParcelFlowTotals,
  ParcelTotals,
  GraphDataPoint,
};

export interface MerchantPerformanceTopMerchant {
  merchant_id: string;
  business_name: string;
  successful_parcels: number;
  total_parcels: number;
  total_transactions: number;
  platform_charge: number;
}

export interface MerchantPerformanceSummary {
  total_merchants: number;
  active_merchants: number;
  total_stores: number;
  total_parcels: number;
  delivered_parcels: number;
  returned_parcels: number;
  total_transactions: number;
  total_platform_charge: number;
  top_merchant: MerchantPerformanceTopMerchant | null;
}

export interface MerchantPerformancePagination {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface MerchantPerformanceData {
  summary: MerchantPerformanceSummary;
  merchants: unknown[];
  pagination: MerchantPerformancePagination;
}

export interface MerchantPerformanceResponse {
  success: boolean;
  data: MerchantPerformanceData;
  message: string;
}