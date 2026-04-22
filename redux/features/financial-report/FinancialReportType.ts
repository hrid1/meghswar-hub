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

  

// ========================Hub Expenses=======================

export type HubExpenseCategory =
  | "OFFICE_RENT"
  | "OFFICE_SUPPLY"
  | "UTILITIES"
  | "STATIONARY"
  | "MAINTENANCE"
  | "SALARY"
  | "OTHER";

export type HubExpenseStatus =
  | "IN_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "PENDING";

export interface HubExpense {
  id: string;
  hub_id: string;
  hub_manager_id: string;
  amount: string;
  category: HubExpenseCategory;
  reason: string;
  proof_file_url: string;
  status: HubExpenseStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface HubExpenseListResponse {
  success: boolean;
  data: {
    items: HubExpense[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface CreateHubExpenseRequest {
  amount: number;
  category: HubExpenseCategory;
  reason: string;
  proof_file_url: string;
}

export interface CreateHubExpenseResponse {
  success: boolean;
  message: string;
  data: HubExpense;
}

// ========================Bank Account Details=======================

export type ProviderType = "BANK" | "MFS" | "CARD" | "OTHER";

export interface BankAccount {
  id: string;
  account_name: string;
  account_number: string;
  account_holder_name: string;
  district: string;
  branch_name: string;
  routing: string;
  provider_type: ProviderType;
  current_balance: string;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BankAccountDetailsResponse {
  success: boolean;
  message: string;
  data: BankAccount[];
}

// ========================Create Transfer=======================

export interface CreateTransferRequest {
  transferred_amount: number;
  admin_account_id: string;
  transaction_reference_id: string;
  proof_file_url: string;
  notes?: string;
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



