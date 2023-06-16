import React, { createContext, useState, useEffect } from "react";
import { LOCALSTORAGE_KEY } from "../config";

const GatekeeperContext = createContext({
  verified: false,
  verify: () => {},
});

export const GatekeeperContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const initialVerifiedStatus = Boolean(
    window.localStorage.getItem(LOCALSTORAGE_KEY) === "true",
  );
  const [verified, setVerified] = useState<boolean>(initialVerifiedStatus);

  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY, verified.toString());
  }, [verified]);

  const verify = () => {
    setVerified(true);
  };

  return (
    <GatekeeperContext.Provider value={{ verified, verify }}>
      {children}
    </GatekeeperContext.Provider>
  );
};

export default GatekeeperContext;
