import React, { useState } from "react";

export default function SignDocument() {

  const [receiverWallet, setReceiverWallet] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [privateKeyFile, setPrivateKeyFile] = useState(null);
  const [hash, setHash] = useState("");
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Generate Hash from Backend
  const handleGenerateHash = async () => {

    if (!selectedFile) {
      alert("Please upload a document first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("http://localhost:8080/api/crypto/hash", {
      method: "POST",
      body: formData
    });

    const data = await response.text();
    setHash(data);
  };

  // 🔹 Generate Digital Signature
  const handleSign = async () => {

    if (!selectedFile || !privateKeyFile) {
      alert("Upload document and private key file");
      return;
    }

    setLoading(true);

    const privateKeyText = await privateKeyFile.text();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("privateKey", privateKeyText);

    const response = await fetch("http://localhost:8080/api/crypto/sign", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setSignature(data.signature);
    setLoading(false);
  };

  // 🔹 Download Signature
  const downloadSignature = () => {

    if (!signature) return;

    const blob = new Blob([signature], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "signature.txt";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>

      <div className="card" style={{ padding: 18 }}>
        <div style={{ fontSize: 18, fontWeight: 1000 }}>Sign Document (Sender)</div>
        <div className="muted" style={{ marginTop: 6 }}>
          Upload a document, generate SHA-256 hash, and sign with your private key (backend powered).
        </div>
      </div>

      <div className="grid2">

        {/* LEFT PANEL */}
        <div className="card" style={{ padding: 18 }}>

          <div style={{ fontWeight: 1000 }}>Upload Document</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Select document to sign.
          </div>

          <input
            type="file"
            style={{ marginTop: 12 }}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <hr className="hr" />

          <div style={{ marginTop: 10 }}>
            <div className="label">Upload Private Key File</div>
            <input
              type="file"
              accept=".pem,.txt"
              onChange={(e) => setPrivateKeyFile(e.target.files[0])}
            />
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

        {/* RIGHT PANEL */}
        <div className="card" style={{ padding: 18 }}>

          <div style={{ fontWeight: 1000 }}>Generate Hash</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            SHA-256 fingerprint of the document.
          </div>

          <button
            className="btn"
            style={{ marginTop: 12 }}
            onClick={handleGenerateHash}
          >
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
            <button
              className="btn"
              disabled={!hash || loading}
              onClick={handleSign}
            >
              {loading ? "Signing..." : "Generate Digital Signature"}
            </button>

            <button
              className="btn secondary"
              disabled={!signature}
              onClick={downloadSignature}
            >
              Download Signature
            </button>
          </div>

          {signature && (
            <div style={{ marginTop: 12 }}>
              <div className="label">Signature (Base64)</div>
              <div className="cardInner" style={{ padding: 12 }}>
                <div className="mono" style={{ wordBreak: "break-all" }}>
                  {signature}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
