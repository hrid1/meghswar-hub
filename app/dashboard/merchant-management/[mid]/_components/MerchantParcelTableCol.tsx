const fmt = (iso: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
    ", " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
  );
};

const STATUS_STYLES: Record<string, { bg: string; dot: string; label: string }> = {
  PENDING:          { bg: "bg-orange-100 text-orange-700",  dot: "bg-orange-500",  label: "Pending" },
  IN_PROGRESS:      { bg: "bg-blue-100 text-blue-700",      dot: "bg-blue-500",    label: "In Progress" },
  DELIVERED:        { bg: "bg-green-100 text-green-700",    dot: "bg-green-500",   label: "Delivered" },
  PARTIAL_DELIVERY: { bg: "bg-purple-100 text-purple-700",  dot: "bg-purple-500",  label: "Partial Delivery" },
  RETURNED:         { bg: "bg-red-100 text-red-600",        dot: "bg-red-500",     label: "Return" },
  CANCELLED:        { bg: "bg-gray-100 text-gray-600",      dot: "bg-gray-400",    label: "Cancelled" },
};

export const merchantParcelColumns = [
  // 1. Parcel ID
  {
    key: "parcelId",
    header: "Parcel ID",
    width: "10%",
    render: (row: any) => (
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-gray-800 truncate">
          #{row.parcel_tx_id || row.parcelId || "—"}
        </span>
        {row.merchant_order_id && (
          <span className="text-xs text-gray-400 truncate">
            MID: {row.merchant_order_id}
          </span>
        )}
      </div>
    ),
  },

  // 2. Customer Info
  {
    key: "customer",
    header: "Customer Info",
    width: "18%",
    wrap: true,
    render: (row: any) => {
      const name    = row.customer_name    || row.customer?.customer_name || "N/A";
      const phone   = row.customer_phone   || row.customer?.phone_number  || "—";
      const address = row.customer_address || row.customer?.customer_address || "";
      const short   = address.length > 45 ? address.slice(0, 45) + "…" : address;
      const tooltip = address.length > 90 ? address.slice(0, 90) + "…" : address;

      return (
        <div className="text-sm min-w-0">
          <div className="font-semibold text-gray-900 truncate">{name}</div>
          <div className="text-xs text-gray-600 mt-0.5">{phone}</div>
          <div className="relative group mt-0.5">
            <div className="text-xs text-gray-400 cursor-default break-words">{short}</div>
            {address.length > 45 && (
              <div className="absolute left-0 bottom-full mb-1 z-30 hidden group-hover:block">
                <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-xs">
                  {tooltip}{address.length > 90 && "…"}
                </div>
                <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5" />
              </div>
            )}
          </div>
        </div>
      );
    },
  },

  // 3. Area
  {
    key: "area",
    header: "Area",
    width: "10%",
    render: (row: any) => (
      <div className="text-sm">
        <div className="text-gray-800">{row.area || row.delivery_area?.area || "—"}</div>
        {row.delivery_area?.zone && (
          <div className="text-xs text-gray-400">{row.delivery_area.zone}</div>
        )}
      </div>
    ),
  },

  // 4. Status
  {
    key: "status",
    header: "Status",
    width: "13%",
    render: (row: any) => {
      const s = (row.status || "PENDING").toUpperCase();
      const style = STATUS_STYLES[s] ?? { bg: "bg-gray-100 text-gray-600", dot: "bg-gray-400", label: s };
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${style.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
          {style.label}
        </span>
      );
    },
  },

  // 5. Assigned Rider
  {
    key: "rider",
    header: "Assigned Rider",
    width: "15%",
    render: (row: any) => {
      const r     = row.assigned_rider;
      const name  = row.rider || r?.full_name || r?.user?.full_name || "Not Assigned";
      const phone = row.riderPhone || r?.phone || "—";
      const img   = row.riderImg || r?.photo || null;

      return (
        <div className="flex items-center gap-2">
          {img ? (
            <img
              src={img}
              alt={name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-200"
              onError={(e) => (e.currentTarget.src = `https://i.pravatar.cc/50?u=${name}`)}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-sm leading-tight">{name}</p>
            <p className="text-xs text-gray-500">{phone}</p>
          </div>
        </div>
      );
    },
  },

  // 6. Store
  {
    key: "store",
    header: "Store",
    width: "11%",
    render: (row: any) => (
      <div className="text-sm">
        <p className="font-semibold text-gray-800 truncate">
          {row.store_name || row.store?.business_name || "—"}
        </p>
      </div>
    ),
  },

  // 7. Amount
  {
    key: "amount",
    header: "Amount",
    width: "14%",
    render: (row: any) => {
      const total    = parseFloat(row.total_charge || row.amount || 0);
      const delivery = parseFloat(row.delivery_charge || 0);
      const cod      = parseFloat(row.cod_charge || 0);
      const weight   = parseFloat(row.weight_charge || 0);
      const discount = parseFloat(row.discount || 0);

      return (
        <div className="space-y-0.5">
          <div className="font-bold text-green-600 text-sm">৳{total.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Delivery Charge: ৳{delivery}</div>
          <div className="text-xs text-gray-500">COD Charge: ৳{cod}</div>
          <div className="text-xs text-gray-500">Weight Charge: ৳{weight}</div>
          <div className="text-xs text-orange-500 font-medium">Discount: ৳{discount}</div>
        </div>
      );
    },
  },

  // 8. Age
  {
    key: "age",
    header: "Age",
    width: "13%",
    render: (row: any) => {
      const created    = row.created_at   ? new Date(row.created_at)   : null;
      const updated    = row.updated_at   ? new Date(row.updated_at)   : null;
      const receivedAt = row.received_at  ? new Date(row.received_at)  : created;

      const ageDays = receivedAt
        ? Math.floor((Date.now() - receivedAt.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      return (
        <div className="space-y-1.5 text-xs">
          {ageDays !== null ? (
            <span className="inline-block bg-orange-100 text-orange-600 font-semibold px-3 py-1 rounded-full">
              {ageDays} {ageDays === 1 ? "Day" : "Days"}
            </span>
          ) : (
            <span className="inline-block bg-gray-100 text-gray-400 font-semibold px-3 py-1 rounded-full">
              N/A
            </span>
          )}
          {created && (
            <div>
              <span className="text-gray-400">Created:</span>
              <div className="text-gray-600">{fmt(row.created_at)}</div>
            </div>
          )}
          {updated && (
            <div>
              <span className="text-gray-400">Last Updated:</span>
              <div className="text-gray-600">{fmt(row.updated_at)}</div>
            </div>
          )}
        </div>
      );
    },
  },
];
