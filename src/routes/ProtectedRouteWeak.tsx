import React, { ReactNode, useContext } from "react";
import GatekeeperContext from "../contexts/GatekeeperContext";

const ProtectedRouteWeak = ({ component }: { component: ReactNode }) => {
  const { verified } = useContext(GatekeeperContext);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ pointerEvents: verified ? "all" : "none" }}>
        {component}
      </div>
      {!verified && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            pointerEvents: "all",
          }}
        />
      )}
    </div>
  );
};

export default ProtectedRouteWeak;
