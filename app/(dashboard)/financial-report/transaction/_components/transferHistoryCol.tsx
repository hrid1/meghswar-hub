import { FileIcon } from "lucide-react";

export const riderStatusColumns = [
  {
    key: "date",
    header: "Date",
    width: "15%",
    render: (row: any) => <span className="font-semibold">{row.date}</span>,
  },
  {
    key: "bank",
    header: "Bank",
    width: "15%",
  },
  {
    key: "amount",
    header: "Amount",
    width: "15%",
  },
  {
  key: "proof",
  header: "Proof",
  width: "15%",
  render: (row: any) => (
    <span className="font-semibold text-orange-500 flex items-center space-x-1 cursor-pointer">
      <FileIcon className="w-4 h-4" />
      <span>View Proof</span>
    </span>
  ),
},

  {
    key: "note",
    header: "Note",
    width: "25%",
    render: (row:any) => (<p className="text-nowrap text-sm text-gray-600">{row.note}</p>)
  },

  
  {
    key: "successRate",
    header: "Success Rate",
    width: "15%",
    render: (row: any) => (
      <span className="text-green-500 font-medium px-2 py-1 rounded-2xl"> {row.successRate}</span>
    ),
  },
];
