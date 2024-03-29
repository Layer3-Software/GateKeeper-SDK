import { AccessControlModalProps, Iparams } from "./types";
import "./global.css";
import { PRODUCTION_WEBSITE, STAGING_WEBSITE } from "./config";
import React, { useContext, useEffect, useState } from "react";
import sortUrlParams from "./utils/sortUrlParams";
import { DEFAULT_COLORS } from "./utils/defaultColor";
import GatekeeperContext from "./contexts/GatekeeperContext";

const AccessControlModal = ({
  account,
  polygonId,
  checksIds,
  roles,
  checkCallback,
  customization,
  nftClaimLinks,
  signature,
  isStaging,
  ...props
}: AccessControlModalProps) => {
  document.body.style.overflow = "hidden";

  if (!account) {
    return (
      <div {...props} className="background">
        <div
          className="modal-iframe"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h4
            style={{
              width: "80%",
              fontWeight: 400,
              lineHeight: "28px",
              fontSize: "18px",
            }}
          >
            Please connect you wallet to get start with the GateKeeper
            verification process.
          </h4>
        </div>
      </div>
    );
  }

  const [closeModal, setCloseModal] = useState(false);
  const { verify } = useContext(GatekeeperContext);

  if (!account) return null;

  const receiveMessage = (data: MessageEvent) => {
    try {
      const msgRecieved = JSON.parse(data.data || "{}");
      const isVerified = msgRecieved.isVerified || false;
      checkCallback && checkCallback(msgRecieved);

      if (isVerified) {
        document.body.style.overflow = "visible";
        setCloseModal(true);
        verify();
      }
    } catch {}
  };

  useEffect(() => {
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  const params: Iparams = {
    bgColor: customization
      ? customization.backgroundColor
      : DEFAULT_COLORS.backgroundColor,
    primaryColor: customization
      ? customization.primaryColor
      : DEFAULT_COLORS.primaryColor,
    textColor: customization
      ? customization.textColor
      : DEFAULT_COLORS.textColor,
    buttonTextColor: customization
      ? customization.buttonTextColor
      : DEFAULT_COLORS.buttonTextColor,
    isIframe: "true",
    signature,
    address: account,
    checksIds: checksIds ? checksIds.toString() : undefined,
    roles: roles ? roles.toString() : undefined,
    nftClaimLinks: JSON.stringify(nftClaimLinks || {}),
    polygonId,
  };

  const parsedParams: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(params)) {
    if (key === "nftClaimLinks") {
      const obj = JSON.parse(value);
      if (!Object.keys(obj).length) continue;
    }

    if (value && value !== undefined) {
      parsedParams[key] = value;
    }
  }

  const sortedUrlParams = sortUrlParams(new URLSearchParams(parsedParams));

  const IFRAME_URL = `${
    isStaging ? STAGING_WEBSITE : PRODUCTION_WEBSITE
  }/verify?${sortedUrlParams}`;

  if (closeModal) return null;

  return (
    <div {...props} className="modal-bg">
      <iframe
        className="modal-iframe"
        src={IFRAME_URL}
        data-testid="gatekeeper_iframe"
        allow="camera"
      />
    </div>
  );
};

export default AccessControlModal;
