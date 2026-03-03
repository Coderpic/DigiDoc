import React, { useState } from "react";

export default function VerifyDocument() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [publicKeyFile, setPublicKeyFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [publicKeyTextState, setPublicKeyTextState] = useState(null);
  const [documentHash, setDocumentHash] = useState(null);

  const handleVerify = async () => {

      if (!selectedFile || !signatureFile || !publicKeyFile) {
        alert("Upload document, signature, and public key");
        return;
      }

      const signatureText = await signatureFile.text();
      const publicKeyText = await publicKeyFile.text();

      setPublicKeyTextState(publicKeyText);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("signature", signatureText);
      formData.append("publicKey", publicKeyText);

      const response = await fetch(
        "http://localhost:8080/api/crypto/verify",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      setVerificationResult(data.valid);
      setDocumentHash(data.documentHash); // backend should return this
  };

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
            <div className="muted"><input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              /></div>
          </div>

          <div style={{ marginTop: 14, fontWeight: 1000 }}>Upload Signature</div>
          <div className="cardInner" style={{ marginTop: 12, padding: 18, borderStyle: "dashed" }}>
            <div className="muted"><input
              type="file"
              accept=".txt"
              onChange={(e) => setSignatureFile(e.target.files[0])}
            /></div>
          </div>

          <div style={{ marginTop: 14, fontWeight: 1000 }}>Upload Public Key</div>
          <div className="cardInner" style={{ marginTop: 12, padding: 18, borderStyle: "dashed" }}>
            <div className="muted"><input
              type="file"
              accept=".pem,.txt"
              onChange={(e) => setPublicKeyFile(e.target.files[0])}
            /></div>
          </div>

          <br />

          <button
              className="btn"
              onClick={handleVerify}
            >
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
                  verificationResult === true
                    ? "var(--good)"
                    : verificationResult === false
                    ? "var(--bad)"
                    : "var(--border)"
                }`,
              }}
            >
              {verificationResult === null && (
                <div className="muted">No verification yet.</div>
              )}

              {verificationResult === true && (
                <>
                  <div style={{ fontWeight: 1000, color: "var(--good)" }}>
                    ✅ Signature is VALID
                  </div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    Document integrity confirmed.
                  </div>
                </>
              )}

              {verificationResult === false && (
                <>
                  <div style={{ fontWeight: 1000, color: "var(--bad)" }}>
                    ❌ Signature is INVALID
                  </div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    Document tampering detected.
                  </div>
                </>
              )}
            </div>            

            <div className="cardInner" style={{ padding: 14 }}>
              <div style={{ fontWeight: 1000, marginBottom: 8 }}>Transaction Details</div>
              <div className="muted" style={{ fontSize: 12 }}>Sender Public Key</div>
              <div className="mono" style={{ wordBreak: "break-all" }}>
                {publicKeyTextState
                  ? publicKeyTextState.substring(0, 100) + "..."
                  : "No public key uploaded"}
              </div>


              <div style={{ marginTop: 10 }} className="muted">Document Hash Value (SHA-256)</div>
              <div className="mono">
                {documentHash || "No document processed"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}