import React, { useState } from 'react';
import { DEFAULT_COLORS, WEBSITE } from '../..//utils/constants';
import './GateKeeperModal.css';
import { ModalProps } from './GateKeeperModal.d';
import accountIcon from '../../assets/account.png';
import externalLinkIcon from '../../assets/linkext.png';
import logotext from '../../assets/logotext.png';
import useLocation from '../../hooks/useLocation';
import useVerified from '../../hooks/useVerified';
import Icons from '../Icons';

const GateKeeperModal = ({
  geoIds,
  account,
  polygonId,
  checkIds,
  checkCallback,
  customization,
}: ModalProps) => {
  const [iFrameOpen, setIsFrameOpen] = useState(false);
  const Ids = checkIds ? checkIds.join(',') : '';
  const allowed = useLocation(geoIds);
  const { isVerified, checksStatus } = useVerified(account, Ids, checkCallback);
  const IS_POPUP = 'true';
  const isKycNeeded = checksStatus.KYC === false;

  document.body.style.overflow = 'hidden';

  if (!account || !allowed || isVerified) {
    document.body.style.overflow = 'visible';
    return <></>;
  }

  const openIframe = () => setIsFrameOpen(true);

  const {
    backgroundColor,
    buttonTextColor,
    primaryColor,
    textColor,
  } = customization ? customization : DEFAULT_COLORS;

  const params = {
    bgModal: backgroundColor ?? DEFAULT_COLORS.backgroundColor,
    textColor: textColor ?? DEFAULT_COLORS.textColor,
    buttonTextColor: buttonTextColor ?? DEFAULT_COLORS.buttonTextColor,
    primaryColor: primaryColor ?? DEFAULT_COLORS.primaryColor,
    IS_POPUP,
    KYC: isKycNeeded ? 'true' : 'false',
    polygonId: polygonId ? 'true' : 'false',
    address: account,
  };

  const ee = [
    {
      type: 'KYC',
      onClick: () => console.log('kyc'),
    },
    { type: 'PolygonId', onClick: () => console.log('otro') },
  ];

  return (
    <div>
      {!iFrameOpen ? (
        <div
          style={{ backgroundColor: backgroundColor, color: textColor }}
          className="modal"
        >
          <div className="modal-body">
            <img src={accountIcon} width="260px" alt="account" />

            <div className="modal-text">
              <h2>Let’s start your journey</h2>
              <p>
                We need you to go through our simple and quick KYC and Polygon
                ID verification process to continue.
              </p>
            </div>

            {ee.map(item => (
              <button className="item" onClick={item.onClick}>
                <Icons checkType={item.type} />
                <h4>{item.type}</h4>
              </button>
            ))}
          </div>

          <div className="modal-footer">
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
              <div>Powered by </div>
              <img
                style={{ marginLeft: '5px' }}
                src={logotext}
                alt="logo"
                width="120px"
              />
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
