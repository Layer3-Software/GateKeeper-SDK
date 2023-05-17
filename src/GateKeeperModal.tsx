import { GateKeeperModalProps } from "./types";
import React from "react";
import "./global.css";
import { WEBSITE } from "./config";

const GateKeeperModal = ({
  account,
  polygonId,
  checksIds,
  roles,
  checkCallback,
  customization,
  nftClaimLinks,
  isStaging,
}: GateKeeperModalProps) => {
  // visible - hidden
  document.body.style.overflow = "hidden";

  if (!account) return null;

  const params = {
    bgColor: customization?.backgroundColor ?? "",
    primaryColor: customization?.primaryColor ?? "",
    textColor: customization?.textColor ?? "",
    buttonTextColor: customization?.buttonTextColor ?? "",
    isIframe: "true",
    address: account,
    checksIds: checksIds?.toString() ?? "",
    roles: roles?.toString() ?? "",
    polygonId: polygonId ? "true" : "false",
    checkCallback: checkCallback ?? "",
    nftClaimLinks: nftClaimLinks?.toString() ?? "",
    isStaging: isStaging ? "true" : "false",
  };

  const IFRAME_URL = `${WEBSITE}/verify?${new URLSearchParams(
    params,
  ).toString()}`;

  return (
    <div className="background">
      <iframe className="modal-iframe" src={IFRAME_URL} allow="camera" />
    </div>
  );
};

export default GateKeeperModal;
