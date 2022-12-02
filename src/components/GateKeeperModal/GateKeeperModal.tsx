import React, { useState } from 'react';
import {
  DEFAULT_COLORS,
  MODAL_NOT_ALLOWED,
  WEBSITE,
} from '../..//utils/constants';
import './GateKeeperModal.css';
import { ModalProps, ModalTextProps } from './GateKeeperModal.d';
import accountIcon from '../../assets/account.png';
import verifyIcon from '../../assets/verification.png';
import externalLinkIcon from '../../assets/linkext.png';
import useLocation from '../../hooks/useLocation';
import useVerified from '../../hooks/useVerified';
import Clock from '../Clock';

const GateKeeperModal = ({
  geoIds,
  account,
  checkIds,
  checkCallback,
  customization,
}: ModalProps) => {
  const [iFrameOpen, setIsFrameOpen] = useState(false);
  const Ids = checkIds ? checkIds.join(',') : '';
  const allowed = useLocation(geoIds);
  const isVerified = useVerified(account, Ids, checkCallback);

  document.body.style.overflow = 'hidden';

  if (!account || !allowed || isVerified) {
    document.body.style.overflow = 'visible';
    return <></>;
  }

  const openIframe = () => {
    setIsFrameOpen(true);
  };

  const getText = (): ModalTextProps => {
    return MODAL_NOT_ALLOWED;
  };
  const { header, title, description } = getText();

  const shortAccount = () => {
    const start_account = account.slice(0, 6);
    const end_account = account.slice(-4);
    return `${start_account}...${end_account}`;
  };
  const {
    backgroundColor,
    buttonTextColor,
    primaryColor,
    textColor,
  } = customization ? customization : DEFAULT_COLORS;
  const IS_POPUP = 'true';
  const params = {
    bgModal: backgroundColor ?? DEFAULT_COLORS.backgroundColor,
    textColor: textColor ?? DEFAULT_COLORS.textColor,
    buttonTextColor: buttonTextColor ?? DEFAULT_COLORS.buttonTextColor,
    primaryColor: primaryColor ?? DEFAULT_COLORS.primaryColor,
    IS_POPUP,
    address: account,
  };

  return (
    <div>
      {!iFrameOpen ? (
        <div
          style={{ backgroundColor: backgroundColor, color: textColor }}
          className="modal"
        >
          <div className="modal-header">
            <img src={verifyIcon} alt="verify" width="32px" height="32px" />
            <h2>{header}</h2>
          </div>
          <div className="modal-body">
            <img src={accountIcon} width="256px" alt="account" />
            <div className="body-texts">
              <h2>{title}</h2>
              <p>{description}</p>
              <div className="body-wallet">
                <p>{shortAccount()}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div
              className="modal-average"
              style={{ color: buttonTextColor, backgroundColor: primaryColor }}
            >
              <Clock color={buttonTextColor} />

              <p id="average">Average verification time: 5 minutes</p>
            </div>

            <button
              style={{ color: buttonTextColor, backgroundColor: primaryColor }}
              onClick={openIframe}
              className="button-basic"
              id="btn-verify"
            >
              Start verification
              <img
                src={externalLinkIcon}
                alt="time"
                width="20px"
                height="20px"
              />
            </button>

            <div className="powered">
              Powered by <span id="kyc">GATEKEEPER</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal">
          <iframe
            id="myframe"
            className="modal-iframe"
            style={{ backgroundColor: backgroundColor }}
            name="iframe_a"
            src={`${WEBSITE}?${new URLSearchParams(params).toString()}`}
            frameBorder="0"
            allow="camera"
          ></iframe>
        </div>
      )}

      <div className="bg" />
    </div>
  );
};

export default GateKeeperModal;
