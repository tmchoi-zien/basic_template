// contexts/AuthContext.tsx
import { setTokens } from "@/utils/authHelper";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (tokens: Tokens) => void;
  logout: () => void;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!!storedAccessToken && !!storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setTokens(storedAccessToken, storedRefreshToken);
    }
  }, []);

  useEffect(() => {
    setIsLogin(!!accessToken && !!refreshToken);
  }, [() => accessToken && refreshToken]);

  const login = (tokens: Tokens) => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    setTokens(tokens.accessToken, tokens.refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setTokens(null, null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, login, logout, isLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("auth context error");
  }
  return context;
};
