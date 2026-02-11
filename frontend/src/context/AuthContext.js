import React, { createContext, useContext, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getUser());
  const [token, setToken] = useState(() => authService.getToken());

  const value = useMemo(() => ({
    user,
    token,
    isAuthed: Boolean(token),
    login: async (email, password) => {
      const res = await authService.login(email, password);
      setUser(res.user);
      setToken(res.token);
      return res;
    },
    connectWallet: async () => {
      const res = await authService.connectWallet();
      setUser(res.user);
      setToken(res.token);
      return res;
    },
    logout: () => {
      authService.logout();
      setUser(null);
      setToken(null);
    },
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
