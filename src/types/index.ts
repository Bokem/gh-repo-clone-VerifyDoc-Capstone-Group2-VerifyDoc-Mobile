/**
 * Shared type definitions for VerifyDoc verification data.
 * These mirror the backend's contract exactly, see README.md no.3 fo
 * Keep in sync with whatever the Backend track ships; update here first
 * whenever the API response shape changes.
 */

// Credential ID 
// Format: VD-[YEAR]-[INST_CODE]-[8-CHAR-RANDOM-HEX]
// Example: VD-2026-UNILAG-F8A39C2E
export type CredentialId = string;

// QR Code Payload 
// The raw JSON embedded inside a scanned QR code.
export interface QRPayload {
  v: string;            // payload/schema version, e.g. "1.0"
  id: CredentialId;      // the credential number
  hash: string;          // SHA-256 checksum of the underlying document record
  sig: string;            // cryptographic signature (e.g. base64/DER-encoded)
}

// Verification Method 
export type VerificationMethod = "QR_SCAN" | "MANUAL_ENTRY";

// Verification Request
// POST /api/v1/verify/lookup
export interface VerificationRequest {
  credentialNumber: CredentialId;
  verificationMethod: VerificationMethod;
}

// The 4 Pillars 
export type VerificationStatus =
  | "AUTHENTIC"
  | "TAMPERED"
  | "REVOKED"
  | "EXPIRED"
  | "NOT_FOUND";

export interface Institution {
  name: string;
  code: string;           // e.g. "UNILAG"
  registered: boolean;    //  REGISTERED ISSUER check
}

// --- Verification Response Data ---
export interface VerificationData {
  status: VerificationStatus;      // Pillar 1: Authenticity Status
  institution: Institution;         // Pillar 2: Registered Institution
  isUnaltered: boolean;              // Pillar 3: Document Integrity
  isActive?: boolean;                 // Pillar 4: Credential State (not revoked/expired)
  holderFullName: string;
  issuedDate?: string;                 // ISO 8601
  expiryDate?: string;                  // ISO 8601, if applicable
}

// Full API Response 
// POST /api/v1/verify/lookup -> 200 OK
export interface VerificationResponse {
  success: boolean;
  data: VerificationData;
}

// Error Response 
// For non-200 responses (e.g. credential not found, malformed request)
export interface VerificationErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// Offline Cache Entry 
// Shape for locally cached, previously-verified credentials
// (used by src/storage/offlineCache.ts for offline QR verification).
export interface CachedCredential {
  payload: QRPayload;
  lastVerifiedResult: VerificationData;
  cachedAt: string; // ISO 8601 timestamp
}