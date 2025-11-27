export const marcentParcelColumns = [
  {
    key: "parcleId",
    title: "Parcel Id",
    width: 100,
  },
  {
    key: "customerInfo",
    title: "Customer",
    width: 260,
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.customerInfo.name}</span>
        <span className="text-sm text-gray-500">{row.customerInfo.phone}</span>
        <span className="text-xs text-gray-400">
          {row.customerInfo.address}
        </span>
      </div>
    ),
  },
  {
    key: "area",
    title: "Area",
    width: 100,
  },
  {
    key: "status",
    title: "Status",
    width: 160,
    render: (row: any) => (
      <span
        className={`px-3 py-1 text-xs rounded-full ${
          row.status === "Delivered"
            ? "bg-green-100 text-green-600"
            : row.status === "Return To Merchant"
            ? "bg-red-100 text-red-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },

  {
    key: "rider",
    title: "Asigned Rider",
    width: 150,
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.rider.name}</span>
        <span className="text-xs text-gray-500">{row.rider.phone}</span>
      </div>
    ),
  },
  {
    key: "store",
    title: "Store",
    width: 150
  },

  {
    key: "amount",
    title: "Amount",
    width: 100,
    render: (row: any) => <span className="font-semibold">৳ {row.amount}</span>,
  },
  {
    key: "age",
    title: "Age",
    width: 140,
    render: (row: any) => (
      <div className="text-xs text-gray-600 leading-4">
        <p>Delivery Charge: {row.days}</p> {/* 2 days */}
        <p>Weight Charge: {row.createdAt}</p>
        <p>Last Update: {row.updateAt}</p>
      </div>
    ),
  },
];
