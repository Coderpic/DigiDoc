import React from "react";

export default function About() {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ fontSize: 18, fontWeight: 1000 }}>About System</div>
      <div className="muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
        DigitalSig Verify uses RSA public-key cryptography and SHA-256 hashing to sign and verify documents.
        Next steps: connect Spring Boot APIs + DB for users/public keys + signature records.
      </div>
    </div>
  );
}