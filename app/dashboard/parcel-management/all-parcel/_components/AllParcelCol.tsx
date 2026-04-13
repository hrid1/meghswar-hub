import { txt } from "@/lib/utils";

// =============================
  // 1️⃣ Columns Configuration
  // =============================
  export const columns = [
    // 1. Parcel ID
    {
      key: "parcelId",
      header: "ID",
      width: "11%",
      wrap: true,
      render: (row: any) => (
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-medium truncate w-full">
            PID: {txt(row.parcel_tx_id) || txt(row.parcelId) || "—"}
          </span>
          <span className="text-xs text-gray-500 truncate w-full">
            MID: {txt(row.merchant_order_id) || txt(row.marchantId) || "—"}
          </span>
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
        const c = row.customer;
        const customerName =
          txt(row.customer_name) || txt(c?.customer_name) || "N/A";
        const customerPhone =
          txt(row.customer_phone) || txt(c?.phone_number) || "—";
        const address =
          txt(row.customer_address) || txt(c?.customer_address) || txt(row.address) || "";
        const shortAddress =
          address.length > 40 ? address.slice(0, 40) + "..." : address;
        const tooltipAddress =
          address.length > 80 ? address.slice(0, 80) + "..." : address;

        return (
          <div className="text-sm min-w-0">
            <div className="font-semibold text-gray-900 truncate">{customerName}</div>
            <div className="text-gray-600 text-xs mt-0.5">{customerPhone}</div>

            {/* Address with hover tooltip */}
            <div className="relative group mt-1">
              <div className="text-gray-500 text-xs cursor-default break-words">
                {shortAddress}
              </div>
              {address.length > 40 && (
                <div className="absolute left-0 bottom-full mb-1 z-30 hidden group-hover:block">
                  <div className="bg-gray-800 text-white text-xs rounded-md px-3 py-2 shadow-lg whitespace-nowrap max-w-xs">
                    {tooltipAddress}
                    {address.length > 80 && "..."}
                  </div>
                  <div className="w-3 h-3 bg-gray-800 rotate-45 absolute left-4 -bottom-1.5"></div>
                </div>
              )}
            </div>
          </div>
        );
      },
    },

    // 3. Merchant/Store
    {
      key: "store",
      header: "Store",
      width: "22%",
      render: (row: any) => {
        const m = row.merchant;
        const storeName =
          txt(row.store_name) ||
          txt(row.store?.business_name) ||
          txt(m?.user?.full_name) ||
          txt(m?.full_name) ||
          "N/A";
        return (
          <div className="flex items-center space-x-3">
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{storeName}</p>
              <p className="text-xs text-gray-500 truncate">{txt(row.merchant_order_id) || "N/A"}</p>
            </div>
          </div>
        );
      },
    },

    // 4. Area
    {
      key: "area",
      header: "Area",
      width: "11%",
      render: (row: any) => {
        const area = row.delivery_area?.area || row.area || "";
        const zone = row.delivery_area?.zone || "";
        return (
          <div className="text-sm">
            <div>{area}</div>
            <div className="text-xs text-gray-500">{zone}</div>
          </div>
        );
      },
    },

    // 5. Rider
    {
      key: "rider",
      header: "Rider",
      width: "20%",
      render: (row: any) => {
        const r = row.assigned_rider;
        const riderName =
          txt(row.rider) ||
          txt(r?.full_name) ||
          txt(r?.user?.full_name) ||
          "Not Assigned";
        const riderPhone = txt(row.riderPhone) || txt(r?.phone) || "-";
        return (
          <div className="flex items-center space-x-3">
            {/* <img
              src={txt(row.riderImg) || "https://i.pravatar.cc/50?img=1"}
              alt={riderName}
              className="w-9 h-9 rounded-full object-cover shrink-0 border"
              onError={(e) =>
                (e.currentTarget.src = "https://i.pravatar.cc/50?img=1")
              }
            /> */}
            <div>
              <p className="font-medium text-sm">{riderName}</p>
              <p className="text-xs text-gray-500">{riderPhone}</p>
            </div>
          </div>
        );
      },
    },

    // 6. Status
    {
      key: "status",
      header: "Status",
      width: "13%",
      render: (row: any) => {
        const status = txt(row.status) || "PENDING";
        const styles: Record<string, string> = {
          "PENDING": "bg-orange-100 text-orange-700",
          "IN_PROGRESS": "bg-green-100 text-green-700",
          "PARTIAL_DELIVERY": "bg-purple-100 text-purple-700",
          "DELIVERED": "bg-blue-100 text-blue-700",
          "RETURNED": "bg-red-100 text-red-700",
          "CANCELLED": "bg-gray-100 text-gray-700",
        };

        const displayStatus = status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l: any) => l.toUpperCase());

        return (
          <span
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
              styles[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {displayStatus}
          </span>
        );
      },
    },

    // 7. Amount
    {
      key: "amount",
      header: "Amount",
      width: "11%",
      render: (row: any) => {
        const totalCharge = parseFloat(row.total_charge || row.amount || 0);
        const codAmount = parseFloat(row.cod_amount || 0);
        const displayAmount = row.is_cod ? codAmount : totalCharge;

      
        const deliveryCharge = parseFloat(row.delivery_charge || 0);
        const weightCharge = parseFloat(row.weight_charge || 0);
        const codCharge = parseFloat(row.cod_charge || 0);
        // const totalCharge = parseFloat(row.total_charge || 0);
        
        return (
          <div className="font-semibold text-gray-900">
            ৳ {displayAmount.toLocaleString()}
            {row.is_cod && (
              <div className="text-xs text-gray-500">
                COD: ৳ {codAmount.toLocaleString()}
              </div>
            )}
          </div>
        );
      },
    },
    
    // 8. Attempt
    {
      key: "attempt",
      header: "Attempt",
      width: "6%",
      render: (row: any) => (
        <div className="text-center font-semibold text-gray-900">
          {txt(row.attempt) || 0}
        </div>
      ),
    },

    // 9. Delivery Time / Created At
    {
      key: "deliveryTime",
      header: "Created",
      width: "13%",
      render: (row: any) => {
        const createdAt = row.created_at ? new Date(row.created_at) : null;
        const formattedDate = createdAt ? createdAt.toLocaleDateString() : "N/A";
        const formattedTime = createdAt ? createdAt.toLocaleTimeString() : "";
        
        return (
          <div className="text-right">
            <div className="font-semibold text-sm">{row.deliveryTime || formattedDate}</div>
            <div className="text-xs text-gray-500">{formattedTime}</div>
          </div>
        );
      },
    },
  ];