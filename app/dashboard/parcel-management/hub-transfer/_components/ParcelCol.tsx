// ParcelCol.tsx

/** Avoid rendering nested API objects (e.g. merchant) if a field is mis-typed. */
function asPlainText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

export const parcelColumns = (onClickUpdate: any) => [
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "15%",
    render: (row: any) => (
      <div className="font-medium">
        <span className="font-semibold">
          {asPlainText(row.parcel_tx_id) || asPlainText(row.id) || "—"}
        </span>
        <div className="text-xs text-gray-500">
          {asPlainText(row.tracking_number) || "—"}
        </div>
      </div>
    ),
  },
  {
    key: "customerInfo",
    header: "Customer",
    width: "15%",
    wrap: true,
    render: (row: any) => {
      if (!row) return <span>No data</span>;

      const c = row.customer;
      const customerName =
        asPlainText(row.customer_name) || asPlainText(c?.customer_name) || "N/A";
      const customerPhone =
        asPlainText(row.customer_phone) || asPlainText(c?.phone_number) || "N/A";
      const secondary =
        asPlainText(row.customer_secondary_phone) ||
        asPlainText(c?.secondary_number);
      const address =
        asPlainText(row.customer_address) ||
        asPlainText(c?.customer_address) ||
        "";
      const needsTruncation = address.length > 50;

      return (
        <div className="flex flex-col">
          <span className="font-semibold">{customerName}</span>
          <span className="text-sm text-gray-500">{customerPhone}</span>
          {secondary ? (
            <span className="text-xs text-gray-400">{secondary}</span>
          ) : null}
          <div className="relative group">
            <span className="text-xs text-gray-400 line-clamp-2">
              {address || "No address provided"}
            </span>
            {needsTruncation && address && (
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
      if (!row) return <span>No data</span>;
      
      const description = asPlainText(row.product_description);
      const needsTruncation = description.length > 40;
      
      return (
        <div className="relative group">
          <span className="text-sm text-gray-600 line-clamp-2">
            {description || "No description"}
          </span>
          {needsTruncation && description && (
            <div className="absolute left-0 bottom-full mb-2 z-50 hidden group-hover:block">
              <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs whitespace-normal">
                {description}
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
              </div>
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">
            Weight: {asPlainText(row.product_weight) || "0"} kg
          </div>
        </div>
      );
    },
  },
  {
    key: "store",
    header: "Store",
    width: "12%",
    render: (row: any) => {
      const storeId = asPlainText(row.store?.id);
      return (
        <div>
          <div className="font-semibold">
            {asPlainText(row.store?.business_name) || "N/A"}
          </div>
          <div className="text-xs text-gray-500">
            ID: {storeId ? `${storeId.slice(0, 8)}…` : "N/A"}
          </div>
        </div>
      );
    },
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
      const statusStr = asPlainText(row?.status);
      if (!row || !statusStr) return <span>N/A</span>;

      const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || "";
        if (statusLower.includes('hub')) return 'bg-blue-100 text-blue-600';
        if (statusLower.includes('delivered')) return 'bg-green-100 text-green-600';
        if (statusLower.includes('return')) return 'bg-red-100 text-red-600';
        if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-600';
        return 'bg-gray-100 text-gray-600';
      };

      return (
        <span
          className={`px-3 py-1 text-xs rounded-full ${getStatusColor(statusStr)}`}
        >
          {statusStr.replace(/_/g, " ")}
        </span>
      );
    },
  },
  {
    key: "delivery",
    header: "Delivery",
    width: "10%",
    render: (row: any) => {
      const da = row.delivery_area ?? row.delivery_coverage_area;
      const areaStr =
        da == null
          ? null
          : typeof da === "string"
            ? da
            : typeof da === "object" && da !== null
              ? [da.area, da.zone, da.city].filter(Boolean).join(", ") ||
                asPlainText(da.division) ||
                "—"
              : null;
      return (
        <div>
          <div className="text-xs">
            Type: {row.delivery_type === 1 ? "Standard" : row.delivery_type === 2 ? "Express" : "N/A"}
          </div>
          {areaStr != null && areaStr !== "" && (
            <div className="text-xs text-gray-500">Area: {areaStr}</div>
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
    render: (row: any) => {
      if (!row.created_at) return <div>N/A</div>;
      
      try {
        return (
          <div>
            <div className="text-xs">
              {new Date(row.created_at).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(row.created_at).toLocaleTimeString()}
            </div>
          </div>
        );
      } catch (e) {
        return <div>Invalid date</div>;
      }
    },
  },
  {
    key: "action",
    header: "Action",
    width: "8%",
    render: (row: any) => (
      <button
        onClick={() => onClickUpdate && onClickUpdate(row)}
        className="px-3 py-1 text-xs bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Update
      </button>
    ),
  },
];