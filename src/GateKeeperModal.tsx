import { GateKeeperModalProps } from "./types";
import React from "react";
import "./global.css";

const GateKeeperModal = ({
  account,
  polygonId,
  checksIds,
  checkCallback,
  customization,
  nftClaimLinks,
  isStaging,
  roles,
}: GateKeeperModalProps) => {
  // visible - hidden
  document.body.style.overflow = "hidden";

  if (!account) return null;

  const params = {
    bgModal: customization?.backgroundColor ?? "",
    textColor: customization?.textColor ?? "",
    buttonTextColor: customization?.buttonTextColor ?? "",
    primaryColor: customization?.primaryColor ?? "",
    isIframe: "true",
    address: account,
    checksIds: ["CHECK1", "CHECK2", "CHECK3"].toString(),
    roles: ["ROLE1", "ROLE2", "ROLE3"].toString(),
    polygonId: polygonId ? "true" : "false",
  };

  console.log({
    checkCallback,
    checksIds,
    nftClaimLinks,
    isStaging,
    roles,
  });

  const IFRAME_URL = `http://localhost:3000/verify?${new URLSearchParams(
    params,
  ).toString()}`;

  return (
    <div className="background">
      <iframe className="modal-iframe" src={IFRAME_URL} allow="camera" />
    </div>
  );
};

export default GateKeeperModal;
