import React, { createContext, useState } from 'react';
import { DEFAULT_COLORS } from '../utils/constants';
import { Icontext, IexternalContext } from './types';

export const GateKeeperContext = createContext<Icontext>({
  isStaging: false,
  isLoggedIn: false,
  address: '',
  setIsLoggedIn: () => {},
  signer: null,
  customization: DEFAULT_COLORS,
  simulateKYC: false,
});

const GateKeeperContextProvider = ({
  children,
  data,
}: {
  children: JSX.Element;
  data: IexternalContext;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const extraData = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <GateKeeperContext.Provider value={{ ...data, ...extraData }}>
      {children}
    </GateKeeperContext.Provider>
  );
};

export default GateKeeperContextProvider;
