// parcelColumns.ts


export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "reqId",
    header: "Request Id",
    width: "15%",
    render: (row: any) => <span className="font-semibold">{row.parcelid}</span>,
  },

  {
    key: "pickup-location",
    header: "Pickup Location",
    width: "25%",
    render: (row: any) => <p>{row.additionalNote}</p>,
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "20%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
      </div>
    ),
  },

  {
    key: "comments",
    header: "Comment",
    width: "25%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.area}</span>
    ),
  },

  {
    key: "parcel-quantity",
    header: "Parcel Quantity",
    width: "15%",
    render: (row: any) => (
      <span className="font-semibold text-gray-900">{row.amount}</span>
    ),
  },
];
export const parcelColumns1 = (onClickUpdate: any) => [
  {
    key: "reqId",
    header: "Request Id",
    width: "13%",
    render: (row: any) => <span className="font-semibold">{row.parcelid}</span>,
  },

  {
    key: "pickup-location",
    header: "Pickup Location",
    width: "22%",
    render: (row: any) => <p>{row.additionalNote}</p>,
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "18%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
      </div>
    ),
  },

  {
    key: "comments",
    header: "Comment",
    width: "22%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.area}</span>
    ),
  },

  {
    key: "parcel-quantity",
    header: "Parcel Quantity",
    width: "13%",
    render: (row: any) => (
      <span className="font-semibold text-gray-900">{row.amount}</span>
    ),
  },
  {
    key: "rider",
    header: "Rider Info",
    width: "12%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.rider?.name}</div>
        <div className="text-xs text-gray-500">{row.rider?.phone}</div>
      </div>
    ),
  },
];
