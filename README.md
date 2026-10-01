# VerifyDoc Mobile

React Native (Expo) client for VerifyDoc — a centralized document verification
platform that lets anyone verify the authenticity of a credential (QR scan or
Credential Number) in under 30 seconds.

This repo covers the **Mobile Development** track of the VerifyDoc Phase 1 build.



# 1. Core Objective

Verify authenticity, origin, integrity, and status of a document in under
30 seconds, via two input methods:

- Camera QR Scan
- Manual Credential Number Lookup

# 2. The 4 Pillars of Verification

Every scan/lookup returns four checks from the backend:

| Check | What it confirms |
| Authenticity Status | Payload matches recorded cryptographic signature |
| Registered Institution | Issuing authority exists in the verified registry |
| Document Integrity | SHA-256 checksum unaltered |
| Credential State | Active (not revoked or expired) |

# 3. Data Contracts

## Credential ID format
```
VD-[YEAR]-[INST_CODE]-[8-CHAR-RANDOM-HEX]
Example: VD-2026-UNILAG-F8A39C2E
```

## QR Payload (embedded in scanned QR codes)
```json
{"v":"1.0","id":"VD-2026-UNILAG-F8A39C2E","hash":"e3b0c44298fc1c149afbf4c8996fb924","sig":"MEUCIQ..."}
```

## Verification API — `POST /api/v1/verify/lookup`

Request
```json
{
  "credentialNumber": "VD-2026-UNILAG-F8A39C2E",
  "verificationMethod": "QR_SCAN"
}
```

Response (200 OK)
```json
{
  "success": true,
  "data": {
    "status": "AUTHENTIC",
    "holderFullName": "...",
    "isUnaltered": true,
    "institution": { }
  }
}
```

Shared TypeScript interfaces for these shapes live in `src/types/verification.ts`
and should stay in sync with whatever the Backend track ships.

# 4. Tech Stack

| Layer | Tools |
| Framework | React Native (Expo), TypeScript |
| Styling | NativeWind |
| Camera / QR | expo-camera |
| Secure local storage | expo-secure-store |
| HTTP | axios |

# 5. Project Structure

```
src/
├── api/            # backend calls (verify/lookup, credentials/issue)
├── components/      # QRScannerView, VerificationResultCard, CredentialCard
├── screens/          # Scan, ManualInput, Result, Wallet, History
├── navigation/
├── hooks/
├── storage/          # expo-secure-store wrapper + offline credential cache
├── types/            # shared contract types
├── utils/            # signature verification, QR payload parsing
└── constants/
```

# 6. Getting Started

```bash
git clone <this-repo-url>
cd verifydoc-mobile
npm install
cp .env.example .env   # fill in your local API base URL
npx expo start
```

# 7. Environment Variables

See `.env.example`. All client-exposed variables must be prefixed
`EXPO_PUBLIC_` per Expo's convention — anything without that prefix will not
be available in the app bundle.

# 8. Roadmap (Mobile)

| Week | Deliverable |
| Week 1 | Camera QR Scanner View + Manual Input Tab |
| Week 2 | Live API integration + Verification Result Modal |
| Week 3 | End-to-end test (issue → scan → result) + UI polish + demo prep |

# 9. Team / Related Repos

- Backend API: _link here_
- Web (Issuers & Verifiers): _link here_
- Design (Figma): _link here_
