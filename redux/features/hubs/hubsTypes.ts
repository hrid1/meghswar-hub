


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
  data: MyHubData;
  message: string;
  timestamp: string;
}