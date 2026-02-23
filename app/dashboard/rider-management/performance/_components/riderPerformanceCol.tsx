export const riderStatusColumns = [
  {
    key: "date",
    header: "Date",
    width: "12%",
    render: (row: any) => <span className="font-semibold">{row.date}</span>,
  },
  {
    key: "rider",
    header: "Rider",
    width: "20%",
    render: (row: any) => (
      <div className="flex items-center space-x-2">
        <img src={row.riderImg} className="w-8 h-8 rounded-full" alt="rider" />
        <div>
          <p className="font-semibold">{row.rider}</p>
          <p className="text-xs text-gray-500">{row.riderPhone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "delivered",
    header: "Deliverd",
    width: "10%",
  },
  {
    key: "rescheduled",
    header: "Rescheduled",
    width: "10%",
  },
  {
    key: "return",
    header: "Return",
    width: "10%",
  },
  {
    key: "assigned",
    header: "Assigned",
    width: "10%",
  },

  {
    key: "comission",
    header: "Comission",
    width: "12%",
    render: (row: any) => <span> {row.comission}</span>,
  },
  {
    key: "successRate",
    header: "Success Rate",
    width: "16%",
    render: (row: any) => <span className="text-green-500 font-medium"> {row.successRate}</span>,
  },
];
