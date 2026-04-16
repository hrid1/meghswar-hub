import { txt } from "@/lib/utils";
import { EditIcon, EyeIcon } from "lucide-react";

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

          const customerSecondaryPhone =
          txt(row.customer_secondary_phone) || txt(c?.secondary_number) || "";
        const address =
          txt(row.customer_address) || txt(c?.customer_address) || txt(row.address) || "";
        const shortAddress =
          address.length > 40 ? address.slice(0, 40) + "..." : address;
        const tooltipAddress =
          address.length > 80 ? address.slice(0, 80) + "..." : address;

        return (
          <div className="text-sm min-w-0">
            <div className="font-semibold text-gray-900 truncate">{customerName}</div>
            
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

            <div className="text-gray-600 text-xs mt-0.5">{customerPhone} {customerSecondaryPhone && `${customerSecondaryPhone}`}</div>

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
              <p className="text-xs text-gray-500 truncate">{txt(row.store?.id) || "N/A"}</p>
            </div>
          </div>
        );
      },
    },

    // 4. Area
    // {
    //   key: "area",
    //   header: "Area",
    //   width: "11%",
    //   render: (row: any) => {
    //     const area = row.delivery_area?.area || row.area || "";
    //     const zone = row.delivery_area?.zone || "";
    //     return (
    //       <div className="text-sm">
    //         <div>{area}</div>
    //         <div className="text-xs text-gray-500">{zone}</div>
    //       </div>
    //     );
    //   },
    // },

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
        const status = txt(row.status) || "N/A";
        const styles: Record<string, string> = {
          "PENDING": "bg-orange-100 text-orange-700",
          "IN_PROGRESS": "bg-green-100 text-green-700",
          "PARTIAL_DELIVERY": "bg-purple-100 text-purple-700",
          "DELIVERED": "bg-blue-100 text-blue-700",
          "RETURNED": "bg-red-100 text-red-700",
          "CANCELLED": "bg-gray-100 text-gray-700",
          "N/A": "bg-gray-100 text-gray-700",
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
      width: "13%",
      render: (row: any) => {
        const totalCharge = parseFloat(row.total_charge || row.amount || 0);
        const deliveryCharge = parseFloat(row.delivery_charge || 0);
        const codCharge = parseFloat(row.cod_charge || 0);
        const weightCharge = parseFloat(row.weight_charge || 0);
        const discount = parseFloat(row.discount || 0);

        return (
          <div className="text-sm space-y-0.5">
            <div className="font-bold text-green-600">
              ৳ {totalCharge.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              Delivery Charge: &nbsp;৳ {deliveryCharge.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              COD Charge: &nbsp;৳ {codCharge.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              Weight Charge: &nbsp;৳ {weightCharge.toLocaleString()}
            </div>
            <div className="text-xs text-orange-500 font-medium">
              Discount: &nbsp;৳ {discount.toLocaleString()}
            </div>
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
        <div className="text-center font-semibold  bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
          {txt(row.attempt) || 0}
        </div>
      ),
    },

    // 9. Age / Dates
    {
      key: "deliveryTime",
      header: "Age",
      width: "13%",
      render: (row: any) => {
        const createdAt = row.created_at ? new Date(row.created_at) : null;
        const updatedAt = row.updated_at ? new Date(row.updated_at) : null;

        const ageDays = createdAt
          ? Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
          : null;

        const fmt = (d: Date) =>
          d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
          ", " +
          d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

        return (
          <div className="text-sm space-y-1.5">
            {ageDays !== null && (
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                {ageDays} {ageDays === 1 ? "Day" : "Days"}
              </span>
            )}
            {createdAt && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Created:</div>
                <div className="text-xs text-gray-700">{fmt(createdAt)}</div>
              </div>
            )}
            {updatedAt && (
              <div>
                <div className="text-xs text-gray-500 font-medium">Last Updated:</div>
                <div className="text-xs text-gray-700">{fmt(updatedAt)}</div>
              </div>
            )}
          </div>
        );
      },
    },

    //  10. Action
    {
      key: "action",
      header: "Action",
      width: "10%",
      render: (row: any) => (
        <div className="text-center font-semibold text-gray-900 flex items-center  flex-wrap gap-1 justify-center">
          <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600"><EyeIcon className="w-4 h-4" /></button>
          <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"><EditIcon className="w-4 h-4" /></button>
        
        </div>
      ),
    },
  ];