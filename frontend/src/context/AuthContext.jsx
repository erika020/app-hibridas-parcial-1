import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("jwt") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const raw = token.startsWith("Bearer ") ? token.slice(7) : token;

      if (typeof raw !== "string" || raw.split(".").length !== 3) {
        console.warn("Token inválido o mal formado:", raw);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(raw);
        setUser(decoded);  
      } catch (err) {
        console.error("Error decodificando token:", err);
        setUser(null);
      }

      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = (newToken) => {
    const raw = newToken.startsWith("Bearer ")
      ? newToken.slice(7)
      : newToken;

    setToken(raw);
    localStorage.setItem("jwt", raw);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
