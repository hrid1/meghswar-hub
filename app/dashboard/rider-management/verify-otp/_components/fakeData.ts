export const fakeDeliveryVerificationData = [
  {
    verification_id: "ver_001",
    parcel_id: "par_001",
    tracking_number: "TRK123456789",
    rider_id: "rid_9682a7ae-59d3-4ef8-851e-04dbf548fd61",
    rider_name: "Ibrahim Molla",
    rider_phone: "+8801321148151",
    selected_status: "DELIVERED",
    expected_amount: 500,
    collected_amount: 500,
    difference: 0,
    request_reason: null,
    requested_at: "2026-04-24T18:39:15.000Z",
    otp_sent_to: "MERCHANT",
    otp_phone: "+88013****8151",
    otp_expires_at: "2026-04-24T18:44:15.000Z"
  },
  {
    verification_id: "ver_002",
    parcel_id: "par_002",
    tracking_number: "TRK987654321",
    rider_id: "rid_3e871cc1-e2c3-4978-bd16-46a82bd7dfe8",
    rider_name: "Rakib Hasan",
    rider_phone: "+8801987654321",
    selected_status: "PARTIAL_DELIVERY",
    expected_amount: 750,
    collected_amount: 500,
    difference: -250,
    request_reason: "Customer had only 500 taka",
    requested_at: "2026-04-24T17:15:30.000Z",
    otp_sent_to: "CUSTOMER",
    otp_phone: "+88019****4321",
    otp_expires_at: "2026-04-24T17:20:30.000Z"
  },
  {
    verification_id: "ver_003",
    parcel_id: "par_003",
    tracking_number: "TRK456789123",
    rider_id: "rid_855385af-cee7-4a17-875e-88bd511c3143",
    rider_name: "Sabbir Khan",
    rider_phone: "+8801765432109",
    selected_status: "EXCHANGE",
    expected_amount: 1200,
    collected_amount: 1200,
    difference: 0,
    request_reason: "Product exchanged with different size",
    requested_at: "2026-04-24T16:22:45.000Z",
    otp_sent_to: "MERCHANT",
    otp_phone: "+88017****2109",
    otp_expires_at: "2026-04-24T16:27:45.000Z"
  },
  {
    verification_id: "ver_004",
    parcel_id: "par_004",
    tracking_number: "TRK321654987",
    rider_id: "rid_daa3d498-318b-4e82-93ed-4d37a77a1ae9",
    rider_name: null,
    rider_phone: null,
    selected_status: "DELIVERY_RESCHEDULED",
    expected_amount: 300,
    collected_amount: 0,
    difference: -300,
    request_reason: "Customer not available, rescheduled for tomorrow",
    requested_at: "2026-04-24T14:05:20.000Z",
    otp_sent_to: "CUSTOMER",
    otp_phone: "+88015****6789",
    otp_expires_at: null
  },
  {
    verification_id: "ver_005",
    parcel_id: "par_005",
    tracking_number: "TRK789456123",
    rider_id: "rid_9682a7ae-59d3-4ef8-851e-04dbf548fd61",
    rider_name: "Ibrahim Molla",
    rider_phone: "+8801321148151",
    selected_status: "RETURNED",
    expected_amount: 650,
    collected_amount: 0,
    difference: -650,
    request_reason: "Customer rejected the product",
    requested_at: "2026-04-23T13:00:00.000Z",
    otp_sent_to: "MERCHANT",
    otp_phone: "+88017****0000",
    otp_expires_at: "2026-04-23T13:05:00.000Z"
  },
  {
    verification_id: "ver_006",
    parcel_id: "par_006",
    tracking_number: "TRK654987321",
    rider_id: "rid_3e871cc1-e2c3-4978-bd16-46a82bd7dfe8",
    rider_name: "Rakib Hasan",
    rider_phone: "+8801987654321",
    selected_status: "PAID_RETURN",
    expected_amount: 900,
    collected_amount: 900,
    difference: 0,
    request_reason: null,
    requested_at: "2026-04-23T10:45:00.000Z",
    otp_sent_to: "CUSTOMER",
    otp_phone: "+88017****4321",
    otp_expires_at: "2026-04-23T10:50:00.000Z"
  }
];

// Complete response mock
export const fakeDeliveryVerificationResponse = {
  success: true,
  total: 6,
  data: fakeDeliveryVerificationData
};

// With pagination (if needed)
export const fakePaginatedDeliveryVerificationResponse = {
  success: true,
  total: 6,
  page: 1,
  limit: 10,
  totalPages: 1,
  data: fakeDeliveryVerificationData
};