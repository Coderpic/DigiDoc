import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login, connectWallet } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await login(email, password);
      nav("/app/dashboard");
    } catch (ex) {
      setErr(ex.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const onWallet = async () => {
    setErr("");
    setBusy(true);
    try {
      await connectWallet();
      nav("/app/dashboard");
    } catch (ex) {
      setErr(ex.message || "Wallet login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 22 }}>
      <div className="card" style={{ width: "min(980px, 96vw)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr" }}>
          {/* Illustration panel (left) */}
          <div style={{ padding: 26, borderRight: "1px solid var(--border)" }}>
            <div className="badge" style={{ width: "fit-content" }}>🛡️ Secure Authentication</div>
            <h1 style={{ margin: "14px 0 8px", fontSize: 34, letterSpacing: 0.2 }}>
              DigitalSig <span style={{ color: "var(--brand-2)" }}>Verify</span>
            </h1>
            <div className="muted" style={{ lineHeight: 1.6 }}>
              Sign and verify documents using <b>RSA</b> + <b>SHA-256</b>. Maintain integrity and authenticity with a clean enterprise workflow.
            </div>

            <div className="cardInner" style={{ marginTop: 18, padding: 16 }}>
              <div style={{ display: "grid", gap: 10 }}>
                <div className="badge">🔑 Public key verifies signatures</div>
                <div className="badge">✍️ Private key signs documents</div>
                <div className="badge">🧾 Any change breaks verification</div>
              </div>
            </div>

            {/* Optional: keep your own svg later */}
            <div style={{ marginTop: 18, opacity: 0.9 }}>
              <div className="cardInner" style={{ padding: 16 }}>
                <div style={{ fontWeight: 900, marginBottom: 6 }}>Cybersecurity Theme</div>
                <div className="muted" style={{ fontSize: 13 }}>
                  Minimal illustration area (you can later replace with your image/svg).
                </div>
              </div>
            </div>
          </div>

          {/* Form panel (right) */}
          <div style={{ padding: 26 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="badge">✅ Login</div>
                <div className="muted" style={{ marginTop: 8 }}>Use email/password or connect wallet.</div>
              </div>
            </div>

            <form onSubmit={onLogin} style={{ marginTop: 18, display: "grid", gap: 12 }}>
              <div>
                <div className="label">Email Address</div>
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
              </div>

              <div>
                <div className="label">Password</div>
                <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />
              </div>

              {err ? (
                <div className="cardInner" style={{ padding: 12, borderLeft: "4px solid var(--bad)" }}>
                  <div style={{ fontWeight: 800 }}>Error</div>
                  <div className="muted" style={{ fontSize: 13 }}>{err}</div>
                </div>
              ) : null}

              <button className="btn" disabled={busy} type="submit">
                {busy ? "Please wait..." : "LOGIN"}
              </button>

              <button className="btn secondary" disabled={busy} type="button" onClick={onWallet}>
                🦊 CONNECT WALLET (Demo)
              </button>

              <div className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>
                Note: Wallet connect is mocked for now. Next step we’ll integrate real MetaMask + backend JWT.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
