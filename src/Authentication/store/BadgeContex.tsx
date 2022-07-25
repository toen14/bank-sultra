import React, { createContext, useState } from "react";

interface IBadgeContex {
  badge: number;
  setBadge?: (badge: number) => void;
}

export const BadgeContext = createContext<IBadgeContex>({
  badge: 0,
});

function BadgeContextProvider({ children }) {
  const [badge, setBadge] = useState<number>(0);

  const value = {
    badge,
    setBadge,
  };

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
}

export default BadgeContextProvider;
