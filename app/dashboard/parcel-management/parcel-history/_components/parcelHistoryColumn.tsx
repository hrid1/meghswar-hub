export const parcelHistoryColumns = [
  {
    key: "customerInfo",
    header: "Customer",
    width: "20%",
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.customerInfo.name}</span>
        <span className="text-sm text-gray-500">{row.customerInfo.phone}</span>
        <span className="text-xs text-gray-400">{row.customerInfo.address}</span>
      </div>
    ),
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "14%",
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.merchant}</span>
        <span className="text-xs text-gray-500">{row.area}</span>
      </div>
    ),
  },

  {
    key: "rider",
    header: "Rider",
    width: "16%",
    render: (row: any) => (
      <div className="flex flex-col">
        <span className="font-semibold">{row.rider.name}</span>
        <span className="text-xs text-gray-500">{row.rider.phone}</span>
      </div>
    ),
  },

  {
    key: "status",
    header: "Status",
    width: "12%",
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
    key: "amount",
    header: "Amount",
    width: "8%",
    render: (row: any) => <span className="font-semibold">৳ {row.amount}</span>,
  },

  {
    key: "age",
    header: "Age",
    width: "6%",
  },

  {
    key: "deliveryCharge",
    header: "Charges",
    width: "12%",
    render: (row: any) => (
      <div className="text-xs text-gray-600 leading-4">
        <p>Delivery Charge: {row.deliveryCharge}</p>
        <p>Weight Charge: {row.weightCharge}</p>
        <p>Discount: {row.discount}</p>
      </div>
    ),
  },

  {
    key: "createdAt",
    header: "Timeline",
    width: "12%",
    render: (row: any) => (
      <div className="text-xs text-gray-500">
        <p>Created: {row.createdAt}</p>
        <p>Updated: {row.lastUpdated}</p>
      </div>
    ),
  },
];
