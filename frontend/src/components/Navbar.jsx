import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ theme, setTheme }) {
  const { user, logout } = useAuth();

  return (
    <div className="card" style={{ padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: "linear-gradient(135deg, rgba(124,58,237,0.95), rgba(6,182,212,0.85))",
          display: "grid", placeItems: "center", color: "white", fontWeight: 900
        }}>
          D
        </div>
        <div>
          <div style={{ fontWeight: 900, letterSpacing: 0.2 }}>DigitalSig Verify</div>
          <div className="muted" style={{ fontSize: 12 }}>Cryptographic document integrity</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <select
          className="input"
          style={{ width: 150, padding: "9px 10px" }}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <div className="badge">
          <span style={{ fontWeight: 800 }}>{user?.email || "user"}</span>
          <span style={{ opacity: 0.7 }}>•</span>
          <span style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.walletAddress || "Wallet: not linked"}
          </span>
        </div>

        <button className="btn secondary" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
