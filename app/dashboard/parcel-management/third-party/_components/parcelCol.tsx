// ParcelCol.tsx
export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "12%",
    render: (row: any) => (
      <div className="font-medium">
        <span className="font-semibold">{row.parcel_tx_id || row.id}</span>
        <div className="text-xs text-gray-500">{row.tracking_number}</div>
      </div>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "18%",
    wrap: true,
    render: (row: any) => {
      const address = row?.customer_address || "";
      const needsTruncation = address?.length > 50;
      
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{row.customer_name}</span>
          <span className="text-sm text-gray-500">{row.customer_phone}</span>
          {row.customer_secondary_phone && (
            <span className="text-xs text-gray-400">{row.customer_secondary_phone}</span>
          )}
          <div className="relative group">
            <span className="text-xs text-gray-400 line-clamp-2">
              {address}
            </span>
            {needsTruncation && (
              <div className="absolute left-0 bottom-full mb-2 z-50 hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                  {address}
                  <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    key: "product",
    header: "Product",
    width: "15%",
    wrap: true,
    render: (row: any) => {
      const description = row.product_description || "";
      const needsTruncation = description.length > 40;
      
      return (
        <div className="relative group">
          <span className="text-sm text-gray-600 line-clamp-2">
            {description}
          </span>
          {needsTruncation && (
            <div className="absolute left-0 bottom-full mb-2 z-50 hidden group-hover:block">
              <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                {description}
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
              </div>
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">
            Weight: {row.product_weight} kg
          </div>
        </div>
      );
    },
  },
  {
    key: "store",
    header: "Store",
    width: "12%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">{row.store?.business_name || "N/A"}</div>
        <div className="text-xs text-gray-500">ID: {row.store?.id?.substring(0, 8)}...</div>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    width: "10%",
    render: (row: any) => (
      <div>
        <div className="font-semibold">৳{Number(row.cod_amount || 0).toLocaleString()}</div>
        <div className="text-xs text-gray-500">
          {row.is_cod ? 'COD' : 'Prepaid'}
        </div>
        <div className="text-xs text-gray-400">
          Charge: ৳{Number(row.total_charge || 0).toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "12%",
    render: (row: any) => {
      const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('hub')) return 'bg-blue-100 text-blue-600';
        if (statusLower.includes('delivered')) return 'bg-green-100 text-green-600';
        if (statusLower.includes('return')) return 'bg-red-100 text-red-600';
        if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-600';
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
    key: "delivery",
    header: "Delivery",
    width: "10%",
    render: (row: any) => {
      const area =
        typeof row.delivery_area === "string"
          ? row.delivery_area
          : row.delivery_area && typeof row.delivery_area === "object"
            ? [row.delivery_area.area, row.delivery_area.zone, row.delivery_area.city]
                .filter(Boolean)
                .join(", ") || row.delivery_area.division || "—"
            : null;
      return (
        <div>
          <div className="text-xs">
            Type: {row.delivery_type === 1 ? "Standard" : "Express"}
          </div>
          {area && (
            <div className="text-xs text-gray-500">Area: {area}</div>
          )}
          {row.assigned_rider && (
            <div className="text-xs text-green-600">Rider Assigned</div>
          )}
        </div>
      );
    },
  },
  {
    key: "created",
    header: "Created",
    width: "8%",
    render: (row: any) => (
      <div>
        <div className="text-xs">
          {new Date(row.created_at).toLocaleDateString()}
        </div>
        <div className="text-xs text-gray-500">
          {new Date(row.created_at).toLocaleTimeString()}
        </div>
      </div>
    ),
  },
  {
    key: "action",
    header: "Action",
    width: "8%",
    render: (row: any) => (
      <button
        onClick={() => onClickUpdate(row)}
        className="px-3 py-1 text-xs bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Update
      </button>
    ),
  },
];