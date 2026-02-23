// mockData.ts

export type Parcel = {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  merchant: {
    name: string;
    phone: string | number;
  };
  area: string;
  rider: {
    name: string;
    phone: string | number;
  };
  status: "Delivered" | "Return To Merchant";

  reportType: string;
  reason: string;
};

export const mockParcels: Parcel[] = [
  {
    id: "#100001",
    customerInfo: {
      name: "Farzana Rahman",
      phone: "+8801789001122",
      address: "House 12, Road 5, Bashundhara R/A, Dhaka – 1229",
    },
    merchant: { name: "Booklet Design BD", phone: "01745566789" },
    area: "Area 01: Dhanmondi",
    rider: { name: "Ahmed Wasi", phone: "01876543211" },
    status: "Delivered",
    reportType: "Customer Issue",
    reason: "Parcel delivered late.",
  },
  {
    id: "#100002",
    customerInfo: {
      name: "Tanvir Hasan",
      phone: "+8801990098765",
      address: "Mirpur-10, Avenue 3, Dhaka",
    },
    merchant: { name: "Tech Fashion Ltd", phone: "01988997744" },
    area: "Area 03: Mirpur",
    rider: { name: "Sakib Al Mamun", phone: "01833445566" },
    status: "Return To Merchant",
    reportType: "Wrong Address",
    reason: "Customer address mismatched.",
  },
  {
    id: "#100003",
    customerInfo: {
      name: "Jannatul Ferdous",
      phone: "+8801677001122",
      address: "Uttara Sector 10, Dhaka",
    },
    merchant: { name: "Beauty Box BD", phone: "01922668844" },
    area: "Area 02: Uttara",
    rider: { name: "Ridwan Haque", phone: "0155667788" },
    status: "Delivered",
    reportType: "Damage Issue",
    reason: "Box was slightly damaged.",
  },
];
