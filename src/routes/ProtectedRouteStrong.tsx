import React, { ReactNode, useContext } from "react";
import GatekeeperContext from "../contexts/GatekeeperContext";

const ProtectedRouteStrong = ({
  component,
  fallbackComponent,
}: {
  component: ReactNode;
  fallbackComponent: ReactNode;
}) => {
  const { verified } = useContext(GatekeeperContext);

  return <>{verified ? component : fallbackComponent}</>;
};

export default ProtectedRouteStrong;
