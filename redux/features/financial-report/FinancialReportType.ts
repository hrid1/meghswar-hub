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



// financial dashboard stats


export interface FinancialDashboardStatsData {
  available_balance: number;
  transferred_this_month: number;
  expenses_this_month: number;
  pending_transfer: number;
  lifetime_expenses: number;
  lifetime_transferred: number;
}
export interface FinancialDashboardStatsResponse {
    success: boolean;
    data: FinancialDashboardStatsData;
    message: string;
}


// transfer history
type TransferStatus = "IN_REVIEW" | "APPROVED" | "REJECTED" | "COMPLETED" | "PENDING";

export interface FundTransferRequest {
  id: string;
  hub_manager_id: string;
  hub_id: string;
  transferred_amount: number;
  admin_account_id: string;
  admin_account_name: string;
  admin_account_number: string;
  admin_account_holder_name: string;
  transaction_reference_id: string;
  proof_file_url: string;
  status: TransferStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  admin_notes: string | null;
  rejection_reason: string | null;
  notes: string;
  transfer_date: string;
  created_at: string;
  updated_at: string;
};

export interface TransferHistoryResponse {
  success: boolean;
  data: {
    items: FundTransferRequest[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

  

// ========================Create Transfer=======================

export interface CreateTransferRequest {
  transferred_amount: number;
  admin_account_id: string;
  admin_account_name: string;
  admin_account_number: string;
  admin_account_holder_name: string;
  transaction_reference_id: string;
  proof_file_url: string;
  notes: string;
}


export interface CreateTransferResponse {
  success: boolean;
  message: string;
  data: CreateTransferData;
}


export interface  CreateTransferData {
    id: string;
    hub_manager_id: string;
    hub_id: string;
    transferred_amount: number;
    admin_account_id: string;
    admin_account_name: string;
    admin_account_number: string;
    admin_account_holder_name: string;
    transaction_reference_id: string;
    proof_file_url: string;
    status: TransferStatus;
    reviewed_by: string | null;
    reviewed_at: string | null;
    rejection_reason: string | null;
    notes: string;
    transfer_date: string;
    created_at: string;
    updated_at: string;
}



