interface Store {
    name: string;
    phone: string;
  }
  
  interface CodBreakdown {
    cod_amount: number;
    cod_collected_amount: number;
    delivery_charge: number;
    cod_charge: number;
    weight_charge: number;
    return_charge: number;
    total_charge: number;
  }
  
  interface Age {
    total_age: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Parcel {
    parcel_id: string;
    parcel_tx_id: string;
    tracking_number: string;
    status: string;
    reason: string | null;
    destination: string;
    zone: string;
    store: Store;
    cod_breakdown: CodBreakdown;
    age: Age;
  }
  
  interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  interface Summary {
    total_collectable_amount: number;
    total_cleared_parcels: number;
  }
  
  export interface ClearedDeliveryResponse {
    success: boolean;
    data: {
      parcels: Parcel[];
      pagination: Pagination;
      summary: Summary;
    };
    message: string;
  }







// interface ClearedDelivery {
//     parcel_id: string;
//     reason: string;
//     status: string;
//     collectable_amount: number;
//     collected_amount: number;
//   }
  
  export interface CollectedCODAmountData {
    rider_id: string;
    parcel_count: number;
    counted_amount: number;
    cod_cleared_at: string;
    current_balance: number;
    message: string;
  }
  
  export interface CollectedCODAmountResponse {
    success: boolean;
    message: string;
    data: CollectedCODAmountData;
  }





  
  



