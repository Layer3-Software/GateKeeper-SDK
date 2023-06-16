import React, { useContext } from "react";
import GatekeeperContext from "../contexts/GatekeeperContext";

const withGatekeeperWeak = <P extends object>(
  Component: React.ComponentType<any>,
) => {
  return (props: P) => {
    const { verified } = useContext(GatekeeperContext);

    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div style={{ pointerEvents: verified ? "all" : "none" }}>
          <Component {...props} />
        </div>
        {!verified && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 9999,
              pointerEvents: "all",
            }}
          />
        )}
      </div>
    );
  };
};

export default withGatekeeperWeak;
