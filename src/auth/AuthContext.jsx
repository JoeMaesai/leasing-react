import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // { id, username } or null
  const [loading, setLoading] = useState(true);

  // On app load, ask the server who we are (checks cookie session/JWT)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user ?? null);
        }
      } catch (_) { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  async function login(username, password) {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      credentials: "include",              // <-- send/receive cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Login failed");
    }
    const data = await res.json();
    setUser(data.user);
  }

  async function logout() {
    await fetch("http://localhost:3000/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
