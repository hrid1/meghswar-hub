
export const columns = [
    {
      key: "pid",
      header: "Prev. ID",
      width: "12%",
      render: (row: any) => (
        <div className="">
          <p className="font-medium">PID:{row.parcel_tx_id}</p>
          <p className="font-medium">MID:{row.return_parcel?.parcel_tx_id || 'N/A'}</p>
        </div>
      ),
    },
    {
      key: "rid",
      header: "Return ID",
      width: "12%",
      render: (row: any) => (
        <div>
          <p className="font-semibold">RID:{row.return_parcel?.parcel_tx_id || 'N/A'}</p>
          <p className="font-semibold">MID:{row.store?.name || 'N/A'}</p>
        </div>
      ),
    },
    {
      key: "reason",
      header: "Reason",
      width: "15%",
      render: (row: any) => (
        <span className="text-sm text-gray-800">{row.reason || 'N/A'}</span>
      ),
    },
    {
      key: "destination",
      header: "Destination",
      width: "15%",
      render: (row: any) => (
        <span className="text-sm text-gray-600">{row.destination}</span>
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
          <div className="font-semibold">{row.store?.name || 'N/A'}</div>
          <div className="text-xs text-gray-500">{row.store?.phone || 'N/A'}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "12%",
      render: (row: any) => {
        // Determine status color based on status value
        const getStatusColor = (status: string) => {
          const statusLower = status?.toLowerCase() || '';
          if (statusLower.includes('return')) return 'bg-red-100 text-red-600';
          if (statusLower.includes('delivered')) return 'bg-green-100 text-green-600';
          if (statusLower.includes('partial')) return 'bg-yellow-100 text-yellow-600';
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
      render: (row: any) => (
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
      key: "attempt",
      header: "Attempt",
      headerClassName: "w-15",
      render: (row: any) => (
        <div className="font-semibold text-center bg-orange-100 w-2/3 mx-auto rounded-md py-0.5">
          {row.attempt || '1'}
        </div>
      ),
    },
    {
      key: "age",
      header: "Age",
      width: "12%",
      render: (row: any) => <div>{row.age?.total_age || 'N/A'}</div>,
    },
  ];