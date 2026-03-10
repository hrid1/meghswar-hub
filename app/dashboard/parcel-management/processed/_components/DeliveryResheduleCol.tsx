// rescheduledCol.tsx
import { RescheduledParcel } from "@/redux/features/process-unprocess/processUnprocessType";

export const columns = [
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "12%",
    render: (row: RescheduledParcel) => (
      <div className="font-medium">
        <p>{row.parcel_tx_id}</p>
        <p className="text-xs text-gray-500">{row.tracking_number}</p>
      </div>
    ),
  },
  {
    key: "reason",
    header: "Reason",
    width: "15%",
    render: (row: RescheduledParcel) => (
      <span className="text-sm text-gray-800">{row.reason || "N/A"}</span>
    ),
  },
  {
    key: "destination",
    header: "Destination",
    width: "15%",
    render: (row: RescheduledParcel) => (
      <span className="text-sm text-gray-600">{row.destination}</span>
    ),
  },
  {
    key: "zone",
    header: "Zone",
    width: "12%",
    render: (row: RescheduledParcel) => (
      <span className="font-semibold">{row.zone}</span>
    ),
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
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('rescheduled')) return 'bg-blue-100 text-blue-600';
        if (statusLower.includes('partial')) return 'bg-yellow-100 text-yellow-600';
        if (statusLower.includes('delivered')) return 'bg-green-100 text-green-600';
        return 'bg-gray-100 text-gray-600';
      };

      return (
        <span
          className={`px-3 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}
        >
          {row.status?.replace(/_/g, ' ') || 'N/A'}
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
          ৳{(row.cod_breakdown?.cod_collected_amount || 0).toLocaleString()}
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
    render: (row: RescheduledParcel) => (
      <div>
        <div>{row.age?.total_age || "N/A"}</div>
        <div className="text-xs text-gray-500">
          {row.age?.created_at ? new Date(row.age.created_at).toLocaleDateString() : ''}
        </div>
      </div>
    ),
  },
];