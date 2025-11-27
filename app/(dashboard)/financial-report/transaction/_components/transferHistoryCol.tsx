import { FileIcon } from "lucide-react";

export const riderStatusColumns = [
  {
    key: "date",
    title: "Date",
    width: 120,
    render: (row: any) => <span className="font-semibold">{row.date}</span>,
  },
  {
    key: "bank",
    title: "Bank",
    width: 120,
  },
  {
    key: "amount",
    title: "Amount",
    width: 120,
  },
  {
  key: "proof",
  title: "Proof",
  width: 180,
  render: (row: any) => (
    <span className="font-semibold text-orange-500 flex items-center space-x-1 cursor-pointer">
      <FileIcon className="w-4 h-4" />
      <span>View Proof</span>
    </span>
  ),
},

  {
    key: "note",
    title: "Note",
    width: 200,
  },

  
  {
    key: "successRate",
    title: "Success Rate",
    width: 140,
    render: (row: any) => (
      <span className="text-green-500 font-medium px-2 py-1 rounded-2xl"> {row.successRate}</span>
    ),
  },
];
