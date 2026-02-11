import React, { useState } from "react";

export default function VerifyDocument() {
  const [result, setResult] = useState(null); // "valid" | "invalid" | null

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 1000 }}>Verify Document (Receiver)</div>
        <div className="muted" style={{ marginTop: 6 }}>
          Upload document + signature, then verify using sender’s public key (backend integration next).
        </div>
      </div>

      <div className="grid2">
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 1000 }}>Upload Document</div>
          <div className="cardInner" style={{ marginTop: 12, padding: 18, borderStyle: "dashed" }}>
            <div className="muted">Drop document here (UI only)</div>
          </div>

          <div style={{ marginTop: 14, fontWeight: 1000 }}>Upload Signature</div>
          <div className="cardInner" style={{ marginTop: 12, padding: 18, borderStyle: "dashed" }}>
            <div className="muted">Drop signature file here (UI only)</div>
          </div>

          <button className="btn" style={{ marginTop: 14 }} onClick={() => setResult(Math.random() > 0.5 ? "valid" : "invalid")}>
            Verify Signature
          </button>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 1000 }}>Verification Result</div>

          <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
            <div
              className="cardInner"
              style={{
                padding: 14,
                borderLeft: `4px solid ${
                  result === "valid" ? "var(--good)" : result === "invalid" ? "var(--bad)" : "var(--border)"
                }`,
              }}
            >
              {result === "valid" && (
                <>
                  <div style={{ fontWeight: 1000, color: "var(--good)" }}>✅ Signature is VALID</div>
                  <div className="muted" style={{ marginTop: 6 }}>Document integrity confirmed.</div>
                </>
              )}
              {result === "invalid" && (
                <>
                  <div style={{ fontWeight: 1000, color: "var(--bad)" }}>❌ Signature is INVALID</div>
                  <div className="muted" style={{ marginTop: 6 }}>Document tampering detected.</div>
                </>
              )}
              {!result && <div className="muted">No verification yet.</div>}
            </div>

            <div className="cardInner" style={{ padding: 14 }}>
              <div style={{ fontWeight: 1000, marginBottom: 8 }}>Transaction Details</div>
              <div className="muted" style={{ fontSize: 12 }}>Sender Public Key</div>
              <div className="mono">DEMO_PUBLIC_KEY_...</div>

              <div style={{ marginTop: 10 }} className="muted">Document Hash Value</div>
              <div className="mono">DEMO_HASH_SHA256_...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}