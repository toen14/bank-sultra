import React, { createContext, useState } from "react";

export interface ICurrentUser {
  user: Record<string, unknown>;
  token: string;
}

interface IAuthContex {
  currentUser: ICurrentUser | undefined;
  isAuthenticated: boolean;
  authenticate?: (cUser: ICurrentUser) => void;
  logout?: () => void;
}

export const AuthContext = createContext<IAuthContex>({
  currentUser: undefined,
  isAuthenticated: false,
});

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | undefined>();

  function authenticate(cUser: ICurrentUser) {
    setCurrentUser(cUser);
  }

  function logout() {
    setCurrentUser(undefined);
  }

  const value = {
    currentUser: currentUser,
    isAuthenticated: currentUser ? true : false,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
