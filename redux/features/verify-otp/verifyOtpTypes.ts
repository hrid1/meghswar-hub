/**
 * Types for Delivery Verification (OTP Bypass) Hub Approval API
 * Spec: docs/otp.md
 */

export interface PendingHubVerification {
  verification_id: string;
  parcel_id: string;
  tracking_number: string;
  rider_id: string;
  rider_name: string | null;
  rider_phone: string | null;
  selected_status: string;
  expected_amount: number;
  collected_amount: number;
  difference: number;
  request_reason: string | null;
  requested_at: string;
  otp_sent_to: string;
  otp_phone: string;
  otp_expires_at: string | null;
}

/**
 * GET /delivery-verifications/hub-approval/pending
 */
export interface PendingHubApprovalsResponse {
  success: boolean;
  total: number;
  data: PendingHubVerification[];
  message?: string;
}

/**
 * PATCH /delivery-verifications/:verificationId/hub-approval/approve
 */
export interface ApproveHubBypassResponse {
  success: boolean;
  approved: boolean;
  verification_id: string;
  approval_status: "APPROVED";
  action_completed: boolean;
  message: string;
}

/**
 * PATCH /delivery-verifications/:verificationId/hub-approval/reject
 */
export interface RejectHubBypassRequest {
  verification_id: string;
  /** Required string, 5–500 chars */
  rejection_reason: string;
}

export interface RejectHubBypassResponse {
  success: boolean;
  approved: boolean;
  verification_id: string;
  approval_status: "REJECTED";
  action_completed: boolean;
  message: string;
}
