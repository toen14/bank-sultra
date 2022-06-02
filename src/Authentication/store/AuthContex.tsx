import React, { createContext, useState } from "react";

interface IAuthContex {
  token: string;
  isAuthenticated: boolean;
  authenticate?: (token: string) => void;
  logout?: () => void;
}

export const AuthContext = createContext<IAuthContex>({
  token: "",
  isAuthenticated: false,
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState<string>();

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(undefined);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
