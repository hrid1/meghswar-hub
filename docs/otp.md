## 1. List Pending Hub Approval Requests

**Endpoint:** `GET /delivery-verifications/hub-approval/pending`

**Authentication:** Bearer token  
**Roles:** `HUB_MANAGER`, `ADMIN`

**Request Body:** None

**Request Example:**
```http
GET /delivery-verifications/hub-approval/pending
Authorization: Bearer <token>
```

**Success Response `200`:**
```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "verification_id": "verification-uuid",
      "parcel_id": "parcel-uuid",
      "tracking_number": "MF120526DHV4",
      "rider_id": "rider-uuid",
      "rider_name": "Forhad Uddin",
      "rider_phone": "01700000000",
      "selected_status": "DELIVERED",
      "expected_amount": 1200,
      "collected_amount": 1000,
      "difference": -200,
      "request_reason": "Customer paid a lower amount",
      "requested_at": "2026-09-22T10:00:00.000Z",
      "otp_sent_to": "MERCHANT",
      "otp_phone": "01712****78",
      "otp_expires_at": "2026-09-22T10:05:00.000Z"
    }
  ]
}
```

---

## 2. Approve Hub Bypass Request

**Endpoint:** `PATCH /delivery-verifications/:verificationId/hub-approval/approve`

**Authentication:** Bearer token  
**Roles:** `HUB_MANAGER`, `ADMIN`

**Request Body:** None

**Request Example:**
```http
PATCH /delivery-verifications/verification-uuid/hub-approval/approve
Authorization: Bearer <token>
```

**Success Response `200`:**
```json
{
  "success": true,
  "approved": true,
  "verification_id": "verification-uuid",
  "approval_status": "APPROVED",
  "action_completed": true,
  "message": "Hub manager approved the request. Delivery completed without OTP."
}
```

**Notes:**
- Hub managers can approve only requests belonging to their hub.
- Admins can approve requests across hubs.
- This marks the bypass as `APPROVED` and completes the delivery.

---

## 3. Reject Hub Bypass Request

**Endpoint:** `PATCH /delivery-verifications/:verificationId/hub-approval/reject`

**Authentication:** Bearer token  
**Roles:** `HUB_MANAGER`, `ADMIN`

**Request Body:**
```json
{
  "rejection_reason": "OTP verification is still required"
}
```

**Request DTO Validation:**
- `rejection_reason`: required string
- Minimum length: 5 characters
- Maximum length: 500 characters
- Empty or numeric values are rejected

**Request Example:**
```http
PATCH /delivery-verifications/verification-uuid/hub-approval/reject
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response `200`:**
```json
{
  "success": true,
  "approved": false,
  "verification_id": "verification-uuid",
  "approval_status": "REJECTED",
  "action_completed": false,
  "message": "Hub manager rejected the OTP bypass request."
}
```

**Error Example `400`:**
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "No pending hub approval request found"
}
```

**Error Example `403`:**
```json
{
  "success": false,
  "statusCode": 403,
  "error": "Forbidden",
  "message": "You are not authorized to review this verification"
}
```