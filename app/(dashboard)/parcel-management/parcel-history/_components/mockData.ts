// mockData.ts
export type Parcel = {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  merchant: string;
  area: string;
  rider: {
    name: string;
    phone: string;
  };
  status: "Delivered" | "Return To Merchant";
  amount: number;
  age: string;
  deliveryCharge?: number;
  weightCharge?: number;
  discount?: number;
  createdAt: string;
  lastUpdated: string;
};

export const mockParcelsHistory: Parcel[] = [
  {
    id: "#193679",
    customerInfo: {
      name: "Farzana Rahman",
      phone: "+88023456789",
      address:
        "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    merchant: "Booklet Design BD",
    area: "Area 01: Dhanmondi",
    rider: { name: "Ahmed Wasi", phone: "+880234567890" },
    status: "Delivered",
    amount: 1187,
    age: "2 Days",
    deliveryCharge: 125,
    weightCharge: 50,
    discount: 0,
    createdAt: "20 Mar, 2025 2:53 PM",
    lastUpdated: "20 Mar, 2025 2:53 PM",
  },
  {
    id: "#193679",
    customerInfo: {
      name: "Farzana Rahman",
      phone: "+88023456789",
      address:
        "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    merchant: "Booklet Design BD",
    area: "Area 01: Dhanmondi",
    rider: { name: "Ahmed Wasi", phone: "+880234567890" },
    status: "Return To Merchant",
    amount: 1187,
    age: "2 Days",
    deliveryCharge: 125,
    weightCharge: 50,
    discount: 0,
    createdAt: "20 Mar, 2025 2:53 PM",
    lastUpdated: "20 Mar, 2025 2:53 PM",
  },
  {
    id: "#193679",
    customerInfo: {
      name: "Farzana Rahman",
      phone: "+88023456789",
      address:
        "Plot#142, Safwan Road, Block#B, Bashundhara Residential Area, Baridhara, Dhaka - 1229",
    },
    merchant: "Booklet Design BD",
    area: "Area 01: Dhanmondi",
    rider: { name: "Ahmed Wasi", phone: "+880234567890" },
    status: "Return To Merchant",
    amount: 1187,
    age: "2 Days",
    deliveryCharge: 125,
    weightCharge: 50,
    discount: 0,
    createdAt: "20 Mar, 2025 2:53 PM",
    lastUpdated: "20 Mar, 2025 2:53 PM",
  },
];