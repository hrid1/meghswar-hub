export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "request_code",
    header: "Request Id",
    width: "15%",
    render: (row: any) => (
      <span className="font-semibold">{row.request_code}</span>
    ),
  },

  {
    key: "pickup_location",
    header: "Pickup Location",
    width: "25%",
    render: (row: any) => <p>{row.pickup_location}</p>,
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "20%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.store_name}</div>
        <div className="text-xs text-gray-500">{row.store_phone}</div>
      </div>
    ),
  },

  {
    key: "comment",
    header: "Comment",
    width: "20%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.comment || "-"}</span>
    ),
  },

  {
    key: "pickup_count",
    header: "Parcel Quantity",
    width: "10%",
    render: (row: any) => (
      <span className="font-semibold text-gray-900">{row.pickup_count}</span>
    ),
  },

  {
    key: "status",
    header: "Status",
    width: "10%",
    render: (row: any) => (
      <span className="text-sm font-medium text-orange-600">{row.status}</span>
    ),
  },
];
