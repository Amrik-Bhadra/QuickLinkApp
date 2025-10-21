import {
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { apiClient, logoutUser } from "../services/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("authToken")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("authToken");
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const userAuthentication = (newToken: string) => {
    setToken(newToken);
  };

  const logout = async () => {
    await logoutUser();
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, userAuthentication, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
