


export interface Hub {
  id: string;
  hub_code: string;
  branch_name: string;
  area: string;
  address: string;
  manager_name: string;
  manager_phone: string;
}

export interface HubsListResponse {
  success: boolean;
  data: Hub[];
  message: string;
}


// ---------- my hub response ----------


export interface MyHubData {
  id: string;
  hub_code: string;
  branch_name: string;
  area: string;
  address: string;
  manager_name: string;
  manager_phone: string;
  created_at: string;
  updated_at: string;
  
}
export interface MyHubResponse {
  success: boolean;
  data: {
    hub: MyHubData;
  };
  message: string;
  timestamp: string;
}

export interface HubMerchant {
  merchant_id?: string;
  id?: string;
  merchant_name?: string;
  full_name?: string;
  business_name?: string;
  store_id?: string;
  store_name?: string;
  user?: { full_name?: string | null } | null;
  store?: { business_name?: string | null } | null;
}

export interface HubMerchantsResponse {
  success: boolean;
  data: HubMerchant[] | { merchants: HubMerchant[] };
  message: string;
}

export interface HubRider {
  id: string;
  full_name: string;
  phone: string;
}

export interface HubRidersResponse {
  success: boolean;
  data: {
    riders: HubRider[];
  };
  message: string;
}
