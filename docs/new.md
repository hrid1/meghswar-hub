

# **Delivery web 7 minute video api update**

# **Hub Reverse Entry API**

## **API Name**

Get Unprocessed Reverse Entry Parcels

## **Method \+ Endpoint**

GET /hubs/parcels/delivery-outcomes

## **Authentication**

Authorization: Bearer \\\<hub-manager-token\>

Role:

HUB\_MANAGER

## **Query Parameters**

* `page`: integer, optional, default `1`  
* `limit`: integer, optional, default `10`, maximum `100`  
* `search`: string, optional; searches parcel ID, customer, phone, or merchant  
* `status`: optional; `RETURNED`, `PAID_RETURN`, `EXCHANGE`, or `PARTIAL_DELIVERY`  
* `zone`: string, optional  
* `merchantId`: UUID, optional  
* `customerName`: string, optional  
* `customerPhone`: string, optional  
* `merchantName`: string, optional  
* `sortBy`: string, optional, default `updated_at`  
* `order`: `ASC` or `DESC`, optional, default `DESC`

## **Request Body**

None.

## **Success Response**

```json
{
  "success": true,
  "data": {
    "parcels": [
      {
        "id": "parcel-uuid",
        "merchant_order_id": "ORDER-1001",
        "parcel_tx_id": "MF161026A1B2",
        "reason": "Customer refused the parcel",
        "destination": "House 12, Road 5, Dhanmondi, Dhaka",
        "zone": {
          "id": 101,
          "name": "Dhanmondi",
          "area_id": 1001,
          "area_name": "Dhanmondi 27",
          "city_id": 1,
          "city_name": "Dhaka",
          "pricing_zone": "INSIDE_DHAKA"
        },
        "merchant": {
          "id": "merchant-uuid",
          "name": "Megh Fashion",
          "phone": "01700000000",
          "image": "<https://cdn.example.com/merchant.png>",
          "stores": [
            {
              "id": "store-uuid",
              "name": "Megh Fashion",
              "phone": "01700000000",
              "address": "Banani, Dhaka",
              "is_default": true,
              "zone": {
                "id": 202,
                "name": "Banani",
                "area_id": 2002,
                "area_name": "Banani",
                "city_id": 1,
                "city_name": "Dhaka"
              }
            }
          ]
        },
        "status": "RETURNED",
        "charges": {
          "cod_amount": 1187,
          "delivery_charge": 125,
          "cod_charge": 12,
          "weight_charge": 50,
          "discount": 0,
          "return_charge": 70,
          "total_charge": 187
        },
        "age": {
          "display": "2 days 2h 3m",
          "total_age": "2 days 2h 3m",
          "created_at": "2026-10-14T17:00:00.000Z",
          "updated_at": "2026-10-16T19:03:00.000Z"
        },
        "created_at": "2026-10-14T17:00:00.000Z",
        "updated_at": "2026-10-16T19:03:00.000Z",
        "last_updated": "2026-10-16T19:03:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  },
  "message": "Delivery outcomes retrieved successfully"
}
```

## **Error Response**

400 Bad Request

```json
{
  "success": false,
  "message": "Invalid status. Must be one of: PARTIAL_DELIVERY, EXCHANGE, PAID_RETURN, RETURNED"
}
```

## **Business Rules**

* Only `RETURNED`, `PAID_RETURN`, `EXCHANGE`, and `PARTIAL_DELIVERY` are returned.  
* Parcels appear after COD/rider settlement is complete.  
* `return_charge` is the amount saved when the outcome occurred. It comes from the active admin preset for the parcel store, outcome, and `INSIDE_DHAKA`, `SUB_DHAKA`, or `OUTSIDE_DHAKA` pricing zone.  
* Every merchant store is returned. Frontend should select the store with `is_default: true`; if none exists, use the parcel-linked store.  
* Merchant image is optional and can be `null`.

---

## **API Name**

Send Selected Parcels To Delivery Reschedule

## **Method \+ Endpoint**

POST /hubs/parcels/bulk-reschedule-delivery

## **Authentication**

Authorization: Bearer \\\<hub-manager-token\>

Role:

HUB\_MANAGER

## **Request Body**

```json
{
  "parcel_ids": ["parcel-uuid-1", "parcel-uuid-2"]
}
```

## **Success Response**

```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 2,
      "success": 2,
      "failed": 0
    },
    "results": [
      {
        "parcel_id": "parcel-uuid-1",
        "parcel_tx_id": "MF161026A1B2",
        "tracking_number": "TRK-20261016-00001",
        "success": true
      }
    ]
  },
  "message": "2 parcels marked for rescheduled delivery"
}
```

## **Error Response**

400 Bad Request

```json
{
  "success": false,
  "message": "parcel_ids must contain at least one parcel UUID"
}
```

## **Business Rules**

* Accepted source statuses are `RETURNED`, `PAID_RETURN`, `EXCHANGE`, `PARTIAL_DELIVERY`, `RETURNED_TO_HUB`, and `IN_HUB`.  
* The parcel becomes `DELIVERY_RESCHEDULED` and its previous rider assignment is cleared.  
* This action does not apply a return charge.  
* Bulk processing reports per-item failures without hiding successful items.

---

## **API Name**

Get Delivery Reschedule Parcels

## **Method \+ Endpoint**

GET /hubs/parcels/rescheduled

## **Authentication**

Authorization: Bearer \\\<hub-manager-token\>

Role:

HUB\_MANAGER

## **Query Parameters**

* `page`, `limit`, `search`, `merchantId`, `storeId`, `customerName`, `customerPhone`, `merchantName`, `area`, `minAmount`, `maxAmount`, `deliveryType`, `sortBy`, and `order` are optional.

## **Request Body**

None.

## **Success Response**

```json
{
  "success": true,
  "data": {
    "parcels": [
      {
        "id": "parcel-uuid",
        "parcel_tx_id": "MF161026A1B2",
        "reason": "Customer requested another delivery date",
        "customer_name": "Ahmed Wasi",
        "customer_phone": "01700000000",
        "destination": "House 12, Road 5, Dhanmondi, Dhaka",
        "zone": {
          "id": 101,
          "name": "Dhanmondi",
          "area_id": 1001,
          "area_name": "Dhanmondi 27",
          "city_id": 1,
          "city_name": "Dhaka",
          "pricing_zone": "INSIDE_DHAKA"
        },
        "merchant_name": "Megh Fashion",
        "merchant_phone": "01700000000",
        "merchant_image": null,
        "merchant": {
          "id": "merchant-uuid",
          "name": "Megh Fashion",
          "phone": "01700000000",
          "image": null,
          "stores": []
        },
        "status": "DELIVERY_RESCHEDULED",
        "charges": {
          "cod_amount": 1187,
          "delivery_charge": 125,
          "cod_charge": 12,
          "weight_charge": 50,
          "discount": 0,
          "return_charge": 0,
          "total_charge": 187
        },
        "attempt": 1,
        "reschedule_count": 1,
        "age": {
          "display": "2 days 2h 3m",
          "total_age": "2 days 2h 3m",
          "created_at": "2026-10-14T17:00:00.000Z",
          "updated_at": "2026-10-16T19:03:00.000Z"
        },
        "created_at": "2026-10-14T17:00:00.000Z",
        "updated_at": "2026-10-16T19:03:00.000Z",
        "last_updated": "2026-10-16T19:03:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  },
  "message": "Rescheduled deliveries retrieved successfully"
}
```

## **Error Response**

401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## **Business Rules**

* Only unassigned parcels with `DELIVERY_RESCHEDULED` status are returned.  
* `attempt` and `reschedule_count` contain the persisted reschedule-attempt count.  
* Destination and zone refer to the customer delivery location.  
* All merchant stores and their `is_default` value are returned.

---

## **API Name**

Send Selected Parcels To Return To Merchant

## **Method \+ Endpoint**

POST /hubs/parcels/bulk-return-to-merchant

## **Authentication**

Authorization: Bearer \\\<hub-manager-token\>

Role:

HUB\_MANAGER

## **Request Body**

```json
{
  "parcel_ids": ["parcel-uuid-1", "parcel-uuid-2"]
}
```

## **Success Response**

```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 2,
      "success": 2,
      "failed": 0
    },
    "results": [
      {
        "parcel_id": "parcel-uuid-1",
        "parcel_tx_id": "MF161026A1B2",
        "tracking_number": "TRK-20261016-00001",
        "success": true,
        "return_parcel": {
          "id": "return-parcel-uuid",
          "parcel_tx_id": "MR161026C3D4",
          "tracking_number": "RTN-TRK-20261016-00001"
        }
      }
    ]
  },
  "message": "2 parcels marked for return to merchant"
}
```

## **Error Response**

400 Bad Request

```json
{
  "success": false,
  "message": "Cannot mark as return to merchant. Current status: DELIVERED"
}
```

## **Business Rules**

* Accepted source statuses are `RETURNED`, `PAID_RETURN`, `PARTIAL_DELIVERY`, `EXCHANGE`, and `RETURNED_TO_HUB`.  
* A new linked return parcel is generated for the merchant journey.  
* The original parcel keeps its saved, admin-configured return charge.  
* The generated return parcel ID is returned so the frontend can print or assign it.

---

## **API Name**

Get Return To Merchant Parcels

## **Method \+ Endpoint**

GET /hubs/parcels/return-to-merchant

## **Authentication**

Authorization: Bearer \\\<hub-manager-token\>

Role:

HUB\_MANAGER

## **Query Parameters**

* `page`, `limit`, `search`, `merchantId`, `storeId`, `customerName`, `customerPhone`, `merchantName`, `area`, `minAmount`, `maxAmount`, `deliveryType`, `sortBy`, and `order` are optional.

## **Request Body**

None.

## **Success Response**

```json
{
  "success": true,
  "data": {
    "parcels": [
      {
        "id": "original-parcel-uuid",
        "merchant_order_id": "ORDER-1001",
        "original_parcel_id": "MF161026A1B2",
        "new_parcel_id": "MR161026C3D4",
        "destination": "Default merchant store address, Banani, Dhaka",
        "zone": {
          "id": 202,
          "name": "Banani",
          "area_id": 2002,
          "area_name": "Banani",
          "city_id": 1,
          "city_name": "Dhaka",
          "pricing_zone": null
        },
        "merchant_name": "Megh Fashion",
        "merchant_phone": "01700000000",
        "merchant_image": null,
        "merchant": {
          "id": "merchant-uuid",
          "name": "Megh Fashion",
          "phone": "01700000000",
          "image": null,
          "stores": [
            {
              "id": "store-uuid",
              "name": "Megh Fashion",
              "phone": "01700000000",
              "address": "Default merchant store address, Banani, Dhaka",
              "is_default": true,
              "zone": {
                "id": 202,
                "name": "Banani"
              }
            }
          ]
        },
        "status": "RETURN_TO_MERCHANT",
        "charges": {
          "cod_amount": 1187,
          "delivery_charge": 125,
          "cod_charge": 12,
          "weight_charge": 50,
          "discount": 0,
          "return_charge": 70,
          "total_charge": 187
        },
        "age": {
          "display": "2 days 2h 3m",
          "total_age": "2 days 2h 3m",
          "created_at": "2026-10-14T17:00:00.000Z",
          "updated_at": "2026-10-16T19:03:00.000Z"
        },
        "created_at": "2026-10-14T17:00:00.000Z",
        "updated_at": "2026-10-16T19:03:00.000Z",
        "last_updated": "2026-10-16T19:03:00.000Z",
        "return_parcel": {
          "id": "return-parcel-uuid",
          "parcel_tx_id": "MR161026C3D4",
          "tracking_number": "RTN-TRK-20261016-00001",
          "status": "IN_HUB"
        }
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  },
  "message": "Return to merchant parcels retrieved successfully"
}
```

## **Error Response**

401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## **Business Rules**

* Only original parcels with `RETURN_TO_MERCHANT` status are returned.  
* `new_parcel_id` is the display ID of the generated return parcel.  
* Destination is taken from the merchant's default store. If no default exists, the parcel-linked store is used.  
* Every merchant store is also returned with `is_default`, allowing frontend-side selection.  
* Financial values, including `return_charge`, belong to the original parcel.

# **Rider Return Task API**

## **API Name**

Get Rider Return List

## **Method \+ Endpoint**

GET /riders/return-tasks?tab=pending

## **Authentication**

Authorization: Bearer \\\<rider-token\>

Role:

RIDER

## **Query Parameter**

`tab`: `pending` or `completed`, optional, default `pending`

## **Request Body**

None.

## **Success Response**

```json
{
  "success": true,
  "data": [
    {
      "id": "merchant-uuid",
      "merchant_id": "merchant-uuid",
      "name": "Booklet Design BD",
      "address": "Southeast Bank, Bashundhara Branch, Plot 142, Safwan Road, Dhaka",
      "phone": "+8801712345678",
      "image": "<https://cdn.example.com/merchant.png>",
      "number_of_parcels": 12,
      "parcels": [
        {
          "id": "return-parcel-uuid",
          "return_parcel_id": "MR161026A1B2",
          "original_parcel_uuid": "original-parcel-uuid",
          "parcel_id": "MF151026C3D4",
          "customer_name": "Farzana Rahman",
          "customer_phone": "+880123456789",
          "status": "ASSIGNED_TO_RIDER"
        }
      ]
    }
  ],
  "count": 1,
  "tab": "pending",
  "message": "Return tasks retrieved successfully"
}
```

## **Error Response**

401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## **Business Rules**

* The response contains only return parcels assigned to the authenticated rider.  
* Return parcels are grouped by merchant, so the frontend displays one card per merchant.  
* The card includes the merchant name, default-store address, phone number, image, and parcel count.  
* Pending contains today's assigned return parcels with `ASSIGNED_TO_RIDER` status.  
* Completed contains today's parcels completed as `RETURN_TO_MERCHANT`.  
* If no default store exists, the parcel-linked store is used.

---

## **API Name**

Get Rider Return Details

## **Method \+ Endpoint**

GET /riders/return-tasks/:merchantId?tab=pending

## **Authentication**

Authorization: Bearer \\\<rider-token\>

Role:

RIDER

## **Path Parameter**

`merchantId`: UUID, required

## **Query Parameter**

`tab`: `pending`, `completed`, or `all`, optional, default `pending`

## **Request Body**

None.

## **Success Response**

```json
{
  "success": true,
  "data": {
    "id": "merchant-uuid",
    "merchant_id": "merchant-uuid",
    "name": "Booklet Design BD",
    "address": "Southeast Bank, Bashundhara Branch, Plot 142, Safwan Road, Dhaka",
    "phone": "+8801712345678",
    "image": "<https://cdn.example.com/merchant.png>",
    "number_of_parcels": 12,
    "parcels": [
      {
        "id": "return-parcel-uuid-1",
        "return_parcel_id": "MR161026A1B2",
        "original_parcel_uuid": "original-parcel-uuid-1",
        "parcel_id": "MF151026C3D4",
        "customer_name": "Farzana Rahman",
        "customer_phone": "+880123456789",
        "status": "ASSIGNED_TO_RIDER"
      },
      {
        "id": "return-parcel-uuid-2",
        "return_parcel_id": "MR161026E5F6",
        "original_parcel_uuid": "original-parcel-uuid-2",
        "parcel_id": "MF151026G7H8",
        "customer_name": "Urmi Akhter",
        "customer_phone": "+880123456788",
        "status": "ASSIGNED_TO_RIDER"
      }
    ]
  },
  "message": "Return task details retrieved successfully"
}
```

## **Error Response**

404 Not Found

```json
{
  "success": false,
  "message": "Return task not found or not assigned to you"
}
```

## **Business Rules**

* A rider can access only a return task containing parcels assigned to that rider.  
* Merchant ID, name, phone, address, image, and total parcel count are returned.  
* Each item contains the original parcel ID and original customer name and phone.  
* The route uses the merchant UUID returned as `merchant_id` by the return-list API.  
* Frontend can filter the returned `parcels` array for its Parcel ID search box.

---

## **API Name**

Complete Rider Return To Merchant

## **Method \+ Endpoint**

PATCH /riders/return-tasks/:merchantId/complete

## **Authentication**

Authorization: Bearer \\\<rider-token\>

Role:

RIDER

## **Path Parameter**

`merchantId`: UUID, required

## **Request Body**

None.

## **Success Response**

```json
{
  "success": true,
  "data": {
    "merchant_id": "merchant-uuid",
    "completed_at": "2026-10-16T18:00:00.000Z",
    "parcel_count": 12,
    "parcels": [
      {
        "id": "return-parcel-uuid-1",
        "parcel_id": "MR161026A1B2",
        "status": "RETURN_TO_MERCHANT"
      }
    ]
  },
  "message": "Parcels returned to merchant successfully"
}
```

## **Error Response**

404 Not Found

```json
{
  "success": false,
  "message": "No pending return parcels found for this merchant"
}
```

## **Business Rules**

* The operation completes every pending return parcel for the selected merchant assigned to the authenticated rider.  
* All selected parcels are updated in one database transaction.  
* If any database update fails, the entire operation is rolled back.  
* Parcel status and rider action status become `RETURN_TO_MERCHANT`.  
* `completed_at`, `delivered_at`, and rider-action timestamps are recorded.  
* Retrying after successful completion returns `404` because no pending parcels remain.  
* This API does not change COD or return-charge values.

# **Meghswar Dynamic Shipping Label API**

## **API Name**

Download Single Meghswar Shipping Label

## **Method \+ Endpoint**

GET /parcels/:parcelId/label?layout=THERMAL

## **Authentication**

Authorization: Bearer \\\<access-token\>

Roles:

ADMIN, HUB\_MANAGER, MERCHANT

## **Path Parameter**

`parcelId`: Parcel UUID, required

## **Query Parameter**

`layout`: `THERMAL` or `A4`, optional, default `THERMAL`

## **Request Body**

None.

## **Success Response**

Status: `200 OK`

```
Content-Type: application/pdf
Content-Disposition: attachment; filename="meghswar-label-<tracking-number>.pdf"
```

The response body contains the generated PDF bytes.

## **Error Response**

404 Not Found

```json
{
  "success": false,
  "message": "Parcel with ID <parcelId> not found"
}
```

403 Forbidden

```json
{
  "success": false,
  "message": "You do not have permission to print this shipping label"
}
```

## **Business Rules**

* The label is generated from the latest parcel data; frontend does not send label values.  
* The QR code opens the Meghswar tracking URL for the parcel tracking number.  
* The Code 128 barcode contains the parcel tracking number.  
* Sort hub, delivery hub, zone, area, COD, weight, order ID, merchant, recipient, note, and creation time are populated dynamically.  
* Return parcels and return statuses display the `RETURN` badge automatically.  
* Company phone, address, and tracking website can be configured with `MEGHSWAR_COMPANY_PHONE`, `MEGHSWAR_COMPANY_ADDRESS`, and `MEGHSWAR_WEBSITE`.  
* `THERMAL` creates one 100 x 150 mm label.  
* `A4` creates a half-page label.  
* A merchant can print only its own parcel.  
* A hub manager can print only a parcel currently assigned to their hub.  
* An admin can print any parcel.

---

## **API Name**

Download Bulk Meghswar Shipping Labels

## **Method \+ Endpoint**

POST /parcels/labels

## **Authentication**

Authorization: Bearer \\\<access-token\>

Roles:

ADMIN, HUB\_MANAGER, MERCHANT

## **Request Body**

```json
{
  "parcel_ids": [
    "3b03dbf4-48cb-44e4-bc2a-c2c801d9dd31",
    "8bb28e0a-56c5-45a2-8329-265c7c4f3339"
  ],
  "layout": "A4"
}
```

`parcel_ids`: Required array containing 1-100 parcel UUIDs.

`layout`: `A4` or `THERMAL`, optional, default `A4`.

## **Success Response**

Status: `200 OK`

```
Content-Type: application/pdf
Content-Disposition: attachment; filename="meghswar-shipping-labels-YYYY-MM-DD.pdf"
```

The response body contains the generated multi-label PDF bytes.

## **Error Response**

400 Bad Request

```json
{
  "success": false,
  "message": ["parcel_ids must contain no more than 100 elements"]
}
```

403 Forbidden

```json
{
  "success": false,
  "message": "One or more parcels do not belong to this merchant"
}
```

## **Business Rules**

* Labels are returned in the same order as `parcel_ids`.  
* Duplicate parcel IDs are printed once.  
* `A4` prints two labels per page.  
* `THERMAL` prints one parcel per 100 x 150 mm page.  
* If any parcel is missing or unauthorized, the complete request fails and no partial PDF is returned.  
* This API prints package shipping labels; it does not create or modify merchant financial invoices.

