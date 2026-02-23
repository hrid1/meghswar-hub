export const confirmedPickupColumns = () => [
  {
    key: "request_code",
    header: "Request Id",
    width: "13%",
    render: (row: any) => (
      <span className="font-semibold">{row.request_code}</span>
    ),
  },
  {
    key: "pickup_location",
    header: "Pickup Location",
    width: "22%",
    render: (row: any) => <p>{row.pickup_location}</p>,
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "18%",
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
    width: "22%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">
        {row.comment || "-"}
      </span>
    ),
  },
  {
    key: "pickup_count",
    header: "Parcel Quantity",
    width: "10%",
    render: (row: any) => (
      <span className="font-semibold text-gray-900">
        {row.pickup_count}
      </span>
    ),
  },
  {
    key: "rider",
    header: "Rider Info",
    width: "15%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.rider?.name}</div>
        <div className="text-xs text-gray-500">
          {row.rider?.phone}
        </div>
      </div>
    ),
  },
  {
    key: "completed_at",
    header: "Completed At",
    width: "15%",
    render: (row: any) => (
      <span className="text-sm">
        {new Date(row.completed_at).toLocaleString()}
      </span>
    ),
  },
];
