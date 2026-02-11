import React, { useState } from "react";

export default function SignDocument() {
  const [receiverWallet, setReceiverWallet] = useState("");
  const [hash, setHash] = useState("");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 1000 }}>Sign Document (Sender)</div>
        <div className="muted" style={{ marginTop: 6 }}>
          Upload a document, generate SHA-256 hash, and sign with your private key (backend integration next).
        </div>
      </div>

      <div className="grid2">
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 1000 }}>Upload Document</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>Drag & drop or browse.</div>

          <div className="cardInner" style={{ marginTop: 12, padding: 18, borderStyle: "dashed" }}>
            <div className="muted">Drop file here (UI only for now)</div>
          </div>

          <hr className="hr" />

          <div>
            <div className="label">Receiver Wallet Address</div>
            <input
              className="input"
              value={receiverWallet}
              onChange={(e) => setReceiverWallet(e.target.value)}
              placeholder="0xReceiver..."
            />
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 1000 }}>Generate Hash</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>SHA-256 fingerprint of the document.</div>

          <button className="btn" style={{ marginTop: 12 }} onClick={() => setHash("DEMO_HASH_SHA256_...")}>
            Generate Hash (SHA-256)
          </button>

          <div style={{ marginTop: 12 }}>
            <div className="label">Document Hash Value</div>
            <div className="cardInner" style={{ padding: 12 }}>
              <div className="mono">{hash || "No hash yet"}</div>
            </div>
          </div>

          <hr className="hr" />

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" disabled={!hash}>Generate Digital Signature</button>
            <button className="btn secondary" disabled>Download Signature</button>
          </div>

          <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
            Note: Next we’ll connect to Spring Boot to sign using uploaded private key file and return signature.
          </div>
        </div>
      </div>
    </div>
  );
}
