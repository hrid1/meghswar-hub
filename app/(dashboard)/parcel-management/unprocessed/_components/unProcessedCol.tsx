export const columns = [
  { key: "id", title: "Parcel ID", width: "120px" },
  {
    key: "reason",
    title: "Reason",
    width: "200px",
    render: (row: any) => (
      <span className="text-sm text-gray-800">{row.additionalNote}</span>
    ),
  },
  {
    key: "destination",
    title: "Destination",
    width: "200px",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.additionalNote}</span>
    ),
  },
  {
    key: "zone",
    title: "Zone",
    width: "140px",
    render: (row: any) => <span className="font-semibold">{row.zone}</span>,
  },
  
  {
    key: "merchant",
    title: "Merchant",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
        <div className="text-xs text-gray-400">{row.area}</div>
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    width: 200,
    render: (row: any) => (
      <span
        className={`px-3 py-1 text-xs rounded-full ${
          row.status === "Delivered"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "codAmount",
    title: "COD Amount",
    width: "160px",
    render: (row: any) => (
      <div>
        <div className="text-green-600 font-bold text-lg">
          ৳{row.collectableAmount.toLocaleString()}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          <div>Delivery Charge: ৳{row.deliveryCharge}</div>
          <div>COD Charge: ৳{row.codCharge}</div>
          <div>Weight Charge: ৳{row.weightCharge}</div>
        </div>
      </div>
    ),
  },
  {
    key: "age",
    title: "Age", // 3 days
    width: "120px", 
    render: (row: any) => (
      <div>
        {row.age}
      </div>
    ),
  },
];
