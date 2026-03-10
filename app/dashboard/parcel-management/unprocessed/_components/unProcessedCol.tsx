// unProcessedCol.tsx
export const columns = [
  { 
    key: "parcel_tx_id", 
    header: "Parcel ID", 
    width: "12%",
    render: (row: any) => <span>{row.parcel_tx_id || row.parcel_id}</span>
  },
  {
    key: "reason",
    header: "Reason",
    width: "15%",
    render: (row: any) => (
      <span className="text-sm text-gray-800">{row.reason || "N/A"}</span>
    ),
  },
  {
    key: "destination",
    header: "Destination",
    width: "15%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.destination}</span>
    ),
  },
  {
    key: "zone",
    header: "Zone",
    width: "12%",
    render: (row: any) => <span className="font-semibold">{row.zone}</span>,
  },
  {
    key: "store",
    header: "Merchant",
    width: "15%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.store?.name || "N/A"}</div>
        <div className="text-xs text-gray-500">{row.store?.phone || "N/A"}</div>
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
          row.status === "PARTIAL_DELIVERY"
            ? "bg-yellow-100 text-yellow-600"
            : row.status === "DELIVERED"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {row.status?.replace(/_/g, " ")}
      </span>
    ),
  },
  {
    key: "codAmount",
    header: "COD Amount",
    width: "15%",
    render: (row: any) => (
      <div>
        <div className="text-green-600 font-bold text-lg">
          ৳{(row.cod_breakdown?.cod_collected_amount || 0).toLocaleString()}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          <div>Delivery Charge: ৳{row.cod_breakdown?.delivery_charge || 0}</div>
          <div>COD Charge: ৳{row.cod_breakdown?.cod_charge || 0}</div>
          <div>Weight Charge: ৳{row.cod_breakdown?.weight_charge || 0}</div>
        </div>
      </div>
    ),
  },
  {
    key: "attempt",
    header: "Attempt",
    headerClassName: "w-15",
    render: (row: any) => (
      <div className="font-semibold text-center bg-orange-100 w-2/3 mx-auto rounded-md py-0.5">
        {row.attempt || "1"}
      </div>
    ),
  },
  {
    key: "age",
    header: "Age",
    width: "12%",
    render: (row: any) => <div>{row.age?.total_age || "N/A"}</div>,
  },
];