export const riderStatusColumns = [
  {
    key: "date",
    title: "Date",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.date}</span>,
  },
  {
    key: "rider",
    title: "Rider",
    width: 200,
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
    title: "Deliverd",
    width: 120,
  },
  {
    key: "rescheduled",
    title: "Rescheduled",
    width: 120,
  },
  {
    key: "return",
    title: "Return",
    width: 120,
  },
  {
    key: "assigned",
    title: "Assigned",
    width: 120,
  },

  {
    key: "comission",
    title: "Comission",
    width: 140,
    render: (row: any) => <span> {row.comission}</span>,
  },
  {
    key: "successRate",
    title: "Success Rate",
    width: 140,
    render: (row: any) => <span className="text-green-500 font-medium"> {row.successRate}</span>,
  },
];
