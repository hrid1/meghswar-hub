

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


// Type definitions
interface MerchantOverviewResponse {
    success: boolean;
    data: MerchantOverviewData;
    message: string;
  }
  
  interface MerchantOverviewData {
    merchant: Merchant;
    store_count: number;
    parcel_totals: ParcelTotals;
    graph: GraphDataPoint[];
    range: string;
    range_start: string;
    range_end: string;
  }
  
 
  
  interface ParcelTotals {
    total: number;
    delivered: number;
    returned: number;
    reported: number;
  }
  
  interface GraphDataPoint {
    bucket: string; // ISO date string format YYYY-MM-DD
    count: number;
  }
  
export type { MerchantOverviewResponse, MerchantOverviewData, ParcelTotals, GraphDataPoint };