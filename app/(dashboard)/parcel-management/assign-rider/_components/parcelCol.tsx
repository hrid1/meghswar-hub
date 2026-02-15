// parcelColumns.ts



export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "parcelid",
    header: "Parcel Id",
    width: "10%",
    render: (row: any) => (
      <div className="">
        <span className="font-semibold block">{row.parcelid} </span>
        <span className="font-semibold block">#{row.merchant.mid} </span>
      </div>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "18%",
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
    key: "additionalNote",
    header: "Additional Note",
    width: "18%",
    render: (row: any) => <p>{row.additionalNote}</p>,
  },

  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.merchant.name}</div>
        <div className="text-xs text-gray-500">{row.merchant.phone}</div>
        <div className="text-xs text-gray-400">{row.area}</div>
      </div>
    ),
  },

  {
    key: "area",
    header: "Area",
    width: "20%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.area}</span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    width: "10%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.amount}</span>
    ),
  },
  {
    key: "age",
    header: "Age",
    width: "9%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.age}</span>
    ),
  },
];
