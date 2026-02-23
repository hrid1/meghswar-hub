export const columns = [
  {
    key: "pid",
    header: "Prev. ID",
    width: "12%",
    render: (row: any) => (
      <div className="">
        <p className=" font-medium">PID:{row.pid}</p>
        <p className="font-medium">MID:{row.mid}</p>
      </div>
    ),
  },
  {
    key: "rid",
    header: "Return ID",
    width: "12%",
    render: (row: any) => <div>
         <p className=" font-semibold">RID:{row.rid}</p>
         <p className=" font-semibold">RID:{row.mid}</p>
    </div>,
  },
  {
    key: "reason",
    header: "Reason",
    width: "15%",
    render: (row: any) => (
      <span className="text-sm text-gray-800">{row.additionalNote}</span>
    ),
  },
  {
    key: "destination",
    header: "Destination",
    width: "15%",
    render: (row: any) => (
      <span className="text-sm text-gray-600">{row.additionalNote}</span>
    ),
  },
  {
    key: "zone",
    header: "Zone",
    width: "12%",
    render: (row: any) => <span className="font-semibold">{row.zone}</span>,
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
    key: "status",
    header: "Status",
    width: "12%",
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
    header: "COD Amount",
    width: "15%",
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
    key: "attempt",
    header: "Attempt",
    headerClassName: "w-15",
    render: (row: any) => (
      <div className="font-semibold text-center bg-orange-100 w-2/3 mx-auto rounded-md py-0.5 ">
        {row.attempt}
      </div>
    ),
  },
  {
    key: "age",
    header: "Age", // 3 days
    width: "12%",
    render: (row: any) => <div>{row.age}</div>,
  },
];
export const mockData = [
  {
    pid: "PX-1001",
    rid: "RX-2001",
    additionalNote: "Customer not available",
    destination: "Banani, Dhaka",
    zone: "Dhaka North",
    merchant: {
      name: "FashionHub",
      phone: "01711-223344",
    },
    area: "Banani DOHS",
    status: "Delivered",
    collectableAmount: 1250,
    deliveryCharge: 60,
    codCharge: 25,
    weightCharge: 20,
    attempt: 1,
    age: "2 days",
  },
  {
    pid: "PX-1002",
    rid: "RX-2002",
    additionalNote: "Wrong address",
    destination: "Gulshan, Dhaka",
    zone: "Dhaka South",

    merchant: {
      name: "TechStore",
      phone: "01722-334455",
    },
    area: "Gulshan 2",
    status: "Pending",
    collectableAmount: 2300,
    deliveryCharge: 80,
    codCharge: 30,
    weightCharge: 25,
    attempt: 2,

    age: "5 days",
  },
];
