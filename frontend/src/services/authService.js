const TOKEN_KEY = "dsv_token";
const USER_KEY = "dsv_user";

function fakeJwt() {
  return "demo.jwt.token." + Math.random().toString(16).slice(2);
}

export const authService = {
  async login(email, password) {
    if (!email || !password) throw new Error("Email and password are required");

    const user = {
      id: "U-" + Math.random().toString(16).slice(2, 8).toUpperCase(),
      email,
      walletAddress: null,
    };

    const token = fakeJwt();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user, token };
  },

  async connectWallet() {
    // For now: mock wallet connection
    const walletAddress = "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
    const user = {
      id: "U-" + Math.random().toString(16).slice(2, 8).toUpperCase(),
      email: "wallet-user@digitalsigverify.local",
      walletAddress,
    };

    const token = fakeJwt();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user, token };
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
};