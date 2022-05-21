import { createContext, useState } from 'react';

export const RoleContext = createContext({
  role: '',
  setRole: (role) => {},
});

function RoleContextProvider({ children }) {
  const [role, setRoleState] = useState();

  function setRole(role) {
    setRoleState(role);
  }

  const value = {
    role: role,
    setRole: setRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export default RoleContextProvider;