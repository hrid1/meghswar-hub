// mockParcels.ts


export type Parcel = {
  parcelid: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  additionalNote: string;
  merchant: {
    mid?: string;
    name: string;
    phone: string | number;
  };
  area: string;
  amount: number;
  age: string; // 2days
};

export const mockParcels: Parcel[] = [
  {
    parcelid: "#P-1001",
    customerInfo: {
      name: "Farzana Rahman",
      phone: "+8801711223344",
      address: "House 12, Road 5, Dhanmondi, Dhaka",
    },
    additionalNote: "Handle with care",
    merchant: {
      mid: "MRC-1001",
      name: "Booklet Design BD",
      phone: "+8801677889900",
    },
    area: "Dhanmondi - 03",
    amount: 1250,
    age: "2 Days",
  },

  {
    parcelid: "#P-1002",
    customerInfo: {
      name: "Nusrat Jahan",
      phone: "+8801911223344",
      address: "Mirpur DOHS, Dhaka-1216",
    },
    additionalNote: "Leave at gate",
    merchant: {
      mid: "MRC-1002",
      name: "TechZone BD",
      phone: "+8801311223344",
    },
    area: "Mirpur - 12",
    amount: 950,
    age: "1 Day",
  },

  {
    parcelid: "#P-1003",
    customerInfo: {
      name: "Shahriar Hossain",
      phone: "+8801811445566",
      address: "Uttara Sector 10, Road 8, Dhaka",
    },
    additionalNote: "Call before delivery",
    merchant: {
      mid: "MRC-1003",
      name: "Fashion Hub BD",
      phone: "+8801555332211",
    },
    area: "Uttara - 10",
    amount: 1750,
    age: "3 Days",
  },
];
