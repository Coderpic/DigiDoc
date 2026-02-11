import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "11px 12px",
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: isActive ? "rgba(124,58,237,0.18)" : "transparent",
  color: "var(--text)",
  fontWeight: 800,
});

export default function Sidebar() {
  return (
    <div style={{ padding: 18 }}>
      <div className="card" style={{ height: "calc(100vh - 36px)", padding: 14, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 14px" }}>
          <div style={{
            width: 40, height: 40, borderRadius: 14,
            background: "linear-gradient(135deg, rgba(124,58,237,0.95), rgba(6,182,212,0.85))",
            display: "grid", placeItems: "center", color: "white", fontWeight: 900
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontWeight: 1000 }}>DigitalSig Verify</div>
            <div className="muted" style={{ fontSize: 12 }}>Secure workflows</div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <NavLink to="/app/dashboard" style={linkStyle}>🏠 Dashboard</NavLink>
          <NavLink to="/app/sign" style={linkStyle}>✍️ Sign Document</NavLink>
          <NavLink to="/app/verify" style={linkStyle}>🛡️ Verify Document</NavLink>
          <NavLink to="/app/about" style={linkStyle}>ℹ️ About System</NavLink>
        </div>

        <div style={{ marginTop: "auto" }}>
          <hr className="hr" />
          <div className="muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
            Tip: Never upload private keys. This UI generates keys locally for demo, backend storage will be added next.
          </div>
        </div>
      </div>
    </div>
  );
}