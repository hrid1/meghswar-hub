// rescheduledCol.tsx
import { RescheduledParcel } from "@/redux/features/process-unprocess/processUnprocessType";
import { CopyValueButton, TextHover } from "@/lib/table.utils";

export const columns = [
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "12%",
    render: (row: RescheduledParcel) => (
      <div className="font-medium">
        <p className="flex items-center gap-1 whitespace-nowrap">
          PID: {row.parcel_tx_id}
          <CopyValueButton value={row.parcel_tx_id} label="Parcel ID" />
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
          MID: {row.merchant_order_id || "—"}
          <CopyValueButton
            value={row.merchant_order_id ?? undefined}
            label="Merchant ID"
          />
        </p>
      </div>
    ),
  },
  {
    key: "reason",
    header: "Reason",
    width: "15%",
    render: (row: RescheduledParcel) => (
      <TextHover text={row.reason || "N/A"} maxLength={40} />
    ),
  },
  {
    key: "destination",
    header: "Destination",
    width: "15%",
    render: (row: RescheduledParcel) => (
      <div>
        <p>{row.customer_name}</p>
        <p>{row.customer_phone}</p>
        <p>{row.customer_secondary_phone}</p>
        
        <TextHover
          text={row.customer_address ?? undefined}
          maxLength={40}
          className="text-gray-600"
        />
      </div>
    ),
  },
  {
    key: "zone",
    header: "Zone",
    width: "12%",
    render: (row: RescheduledParcel) => {
      const area = row.delivery_coverage_area;
      if (!area) return <span className="text-xs text-gray-400">N/A</span>;

      return (
        <>
          <span className="font-semibold">{area.city || "N/A"}</span>
          <br />
          <span>{area.zone || "N/A"}</span> {">"}{" "}
          <span className="text-xs text-gray-500">{area.area || "N/A"}</span>
        </>
      );
    },
  },
  {
    key: "merchant",
    header: "Merchant",
    width: "15%",
    render: (row: RescheduledParcel) => (
      <div>
        <div className="font-semibold">{row.store?.name || "N/A"}</div>
        <div className="text-xs text-gray-500">{row.store?.phone || "N/A"}</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row: RescheduledParcel) => {
      const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || "";
        if (statusLower.includes("rescheduled"))
          return "bg-blue-100 text-blue-600";
        if (statusLower.includes("partial"))
          return "bg-yellow-100 text-yellow-600";
        if (statusLower.includes("delivered"))
          return "bg-green-100 text-green-600";
        return "bg-gray-100 text-gray-600";
      };

      return (
        <span
          className={`px-3 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}
        >
          {row.status?.replace(/_/g, " ") || "N/A"}
        </span>
      );
    },
  },
  {
    key: "codAmount",
    header: "COD Amount",
    width: "15%",
    render: (row: RescheduledParcel) => (
      <div>
        <div className="text-green-600 font-bold text-lg">
          ৳{(row.cod_amount || 0).toLocaleString()}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          <div>Delivery Charge: ৳{row.cod_breakdown?.delivery_charge || 0}</div>
          <div>COD Charge: ৳{row.cod_breakdown?.cod_charge || 0}</div>
          <div>Weight Charge: ৳{row.cod_breakdown?.weight_charge || 0}</div>
        </div>
      </div>
    ),
  },
  {
    key: "rescheduleCount",
    header: "Reschedule Count",
    headerClassName: "w-15",
    render: (row: RescheduledParcel) => (
      <div className="font-semibold text-center bg-orange-100 w-2/3 mx-auto rounded-md py-0.5">
        {row.reschedule_count || 0}
      </div>
    ),
  },
  {
    key: "age",
    header: "Age",
    width: "12%",
    render: (row: RescheduledParcel) => {
      const createdAt = row.age?.created_at || row.created_at;
      const updatedAt = row.age?.updated_at || row.updated_at;
      const receivedAt = row.age?.received_at || row.received_at;

      const fmt = (value?: string | null) => {
        if (!value) return "N/A";
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
      };

      return (
        <div>
          <div>{row.age?.total_age || "N/A"}</div>
          <div className="text-xs text-gray-500">Created: {fmt(createdAt)}</div>
          <div className="text-xs text-gray-500">Updated: {fmt(updatedAt)}</div>
          <div className="text-xs text-gray-500">Received: {fmt(receivedAt)}</div>
        </div>
      );
    },
  },
];
