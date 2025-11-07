import React, { createContext, useContext, useState, ReactNode } from "react";
import { logout as logoutApi } from "../api/logout";

export type AuthContextType = {
  isLoggedIn: boolean;
  role: "admin" | "user" | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string, role: "admin" | "user") => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");
const storedRole = localStorage.getItem("role") as "admin" | "user" | null;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedAccessToken && !!storedRefreshToken && !!storedRole);
  const [role, setRole] = useState<"admin" | "user" | null>(storedRole);
  const [accessToken, setAccessToken] = useState<string | null>(storedAccessToken);
  const [refreshToken, setRefreshToken] = useState<string | null>(storedRefreshToken);

  const login = (accessToken: string, refreshToken: string, role: "admin" | "user") => {
    setIsLoggedIn(true);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setRole(role);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggedIn(false);
      setAccessToken(null);
      setRefreshToken(null);
      setRole(null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
