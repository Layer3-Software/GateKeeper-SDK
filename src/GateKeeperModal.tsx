import { GateKeeperModalProps, Iparams } from "./types";
import "./global.css";
import { WEBSITE } from "./config";
import React from "react";
import sortUrlParams from "./utils/sortUrlParams";

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

  const params: Iparams = {
    bgColor: customization?.backgroundColor,
    primaryColor: customization?.primaryColor,
    textColor: customization?.textColor,
    buttonTextColor: customization?.buttonTextColor,
    isIframe: "true",
    address: account,
    checksIds: checksIds?.toString(),
    roles: roles?.toString(),
    nftClaimLinks: JSON.stringify(nftClaimLinks),
    polygonId: polygonId?.toString(),
    checkCallback: checkCallback?.toString(),
    isStaging: isStaging?.toString(),
  };

  const parsedParams: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(params)) {
    if (value) parsedParams[key] = value;
  }

  const sortedUrlParams = sortUrlParams(new URLSearchParams(parsedParams));
  const IFRAME_URL = `${WEBSITE}/verify?${sortedUrlParams}`;

  return (
    <div className="background">
      <iframe
        className="modal-iframe"
        src={IFRAME_URL}
        data-testid="gatekeeper_iframe"
        allow="camera"
      />
    </div>
  );
};

export default GateKeeperModal;