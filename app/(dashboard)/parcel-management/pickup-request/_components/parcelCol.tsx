// parcelColumns.ts


export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "reqId",
    title: "Request Id",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.parcelid}</span>,
  },

  {
    key: "pickup-location",
    title: "Pickup Location",
    width: 220,
    render: (row: any) => <p>{row.additionalNote}</p>,
  },

  {
    key: "merchant",
    title: "Merchant",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
      </div>
    ),
  },

  {
    key: "comments",
    title: "Comment",
    width: 240,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.area}</span>
    ),
  },

  {
    key: "parcel-quantity",
    title: "Parcel Quantity",
    width: 100,
    render: (row: any) => (
      <span className="font-semibold text-gray-900">{row.amount}</span>
    ),
  },
];
export const parcelColumns1 = (onClickUpdate: any) => [
  {
    key: "reqId",
    title: "Request Id",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.parcelid}</span>,
  },

  {
    key: "pickup-location",
    title: "Pickup Location",
    width: 220,
    render: (row: any) => <p>{row.additionalNote}</p>,
  },

  {
    key: "merchant",
    title: "Merchant",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
      </div>
    ),
  },

  {
    key: "comments",
    title: "Comment",
    width: 240,
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.area}</span>
    ),
  },

  {
    key: "parcel-quantity",
    title: "Parcel Quantity",
    width: 100,
    render: (row: any) => (
      <span className="font-semibold text-gray-900">{row.amount}</span>
    ),
  },
  {
    key: "rider",
    title: "Rider Info",
    width: 180,
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.rider?.name}</div>
        <div className="text-xs text-gray-500">{row.rider?.phone}</div>
      </div>
    ),
  },
];
