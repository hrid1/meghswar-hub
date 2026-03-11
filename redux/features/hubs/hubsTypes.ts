


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
