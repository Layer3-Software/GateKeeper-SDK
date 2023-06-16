import React, { ComponentType, useContext } from "react";
import GatekeeperContext from "../contexts/GatekeeperContext";

const withGatekeeperStrong = <P extends object>(
  Component: ComponentType<P>,
  FallbackComponent: ComponentType,
) => {
  return (props: P) => {
    const { verified } = useContext(GatekeeperContext);

    return verified ? <Component {...props} /> : <FallbackComponent />;
  };
};

export default withGatekeeperStrong;
