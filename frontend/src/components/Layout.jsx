import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const [theme, setTheme] = useState(() => localStorage.getItem("dsv_theme") || "system");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("dsv_theme", theme);
  }, [theme]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ padding: 18 }}>
        <Navbar theme={theme} setTheme={setTheme} />
        <div className="container" style={{ paddingTop: 16, paddingBottom: 28 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
