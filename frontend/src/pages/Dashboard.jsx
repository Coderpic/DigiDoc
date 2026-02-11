import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { keyService } from "../services/keyService";

export default function Dashboard() {
  const { user } = useAuth();
  const [publicKey, setPublicKey] = useState(() => keyService.getStoredPublicKeyPem());
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const onGenerate = async () => {
    setMsg("");
    setBusy(true);
    try {
      const res = await keyService.generateKeyPairAndDownloadPrivate();
      setPublicKey(res.publicPem);
      setMsg("Key pair generated. Private key downloaded. Public key stored locally (temporary).");
    } catch (e) {
      setMsg(e.message || "Key generation failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 1000 }}>Dashboard</div>
            <div className="muted" style={{ marginTop: 6 }}>
              Generate your RSA key pair. Public key is used for verification; private key is downloaded and must be kept secret.
            </div>
          </div>

          <div className="badge">
            <span style={{ fontWeight: 900 }}>User ID:</span> <span className="mono">{user?.id}</span>
          </div>
        </div>
      </div>

      {/* Center panel: key generation cards like your procedure step */}
      <div className="grid2">
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 1000, fontSize: 16 }}>Generate Key Pair</div>
              <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
                Creates RSA-PSS (SHA-256) keys in browser (demo). Backend storage will be added next.
              </div>
            </div>
            <button className="btn" onClick={onGenerate} disabled={busy}>
              {busy ? "Generating..." : "Generate Keys"}
            </button>
          </div>

          <hr className="hr" />

          <div className="cardInner" style={{ padding: 14, borderLeft: "4px solid var(--warning)" }}>
            <div style={{ fontWeight: 900 }}>Private Key Warning</div>
            <div className="muted" style={{ fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
              Private key is <b>never</b> stored in DB. It will be downloaded to your machine.
              If lost, you can’t sign as the same identity again.
            </div>
          </div>

          {msg ? (
            <div style={{ marginTop: 12 }} className="cardInner">
              <div style={{ padding: 12 }} className="muted">{msg}</div>
            </div>
          ) : null}
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 1000, fontSize: 16 }}>Public Key</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Share this public key with receivers to verify your signatures.
          </div>

          <hr className="hr" />

          <div className="cardInner" style={{ padding: 14 }}>
            {publicKey ? (
              <pre className="mono" style={{ margin: 0, whiteSpace: "pre-wrap" }}>{publicKey}</pre>
            ) : (
              <div className="muted">No public key generated yet.</div>
            )}
          </div>

          <div style={{ marginTop: 12 }} className="badge">
            🔒 Stored locally for now (will move to backend “key_pairs” table later)
          </div>
        </div>
      </div>
    </div>
  );
}
