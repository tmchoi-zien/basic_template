import React, { useState, createContext, ReactNode, useCallback } from "react";
import { ROLE } from "@/constants/menu";

interface InfoType {
  role?: ROLE;
  accessToken?: string;
  refreshToken?: string;
}

interface GlobalContextType {
  info: InfoType;
  updateInfo: (info: Object) => void;
}

const defaultContext: GlobalContextType = {
  info: {
    role: ROLE.MASTER,
  },
  updateInfo: () => {},
};

export const GlobalContext = createContext<GlobalContextType>(defaultContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<InfoType>(defaultContext.info);

  const updateInfo = useCallback(
    (info: InfoType) => {
      setInfo({
        role: info.role,
        accessToken: info.accessToken,
        refreshToken: info.refreshToken,
      });
    },
    [info],
  );

  return (
    <GlobalContext.Provider value={{ info, updateInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};
