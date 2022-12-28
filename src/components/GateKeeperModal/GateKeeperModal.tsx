import React, { useEffect, useState } from 'react';
import { DEFAULT_COLORS } from '../..//utils/constants';
import './GateKeeperModal.css';
import { ModalProps } from './GateKeeperModal.d';
import accountIcon from '../../assets/account.png';
import externalLinkIcon from '../../assets/linkext.png';
import logotext from '../../assets/logotext.png';
import useLocation from '../../hooks/useLocation';
import useVerified from '../../hooks/useVerified';
import checkIcon from '../../assets/check.png';
import useSteps from '../../hooks/useSteps';

export interface Steps {
  type: string;
}

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
  const [steps, setSteps] = useState<Steps[]>([]);
  const IS_POPUP = 'true';
  const needCompleteKyc = checksStatus.KYC === false;
  document.body.style.overflow = 'hidden';
  const { currentStep } = useSteps();

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
    KYC: needCompleteKyc ? 'true' : 'false',
    polygonId: polygonId ? 'true' : 'false',
    address: account,
  };

  const getDescription = () => {
    let dinamicPart: string = '';

    if (needCompleteKyc) {
      dinamicPart = 'KYC';
    }

    if (polygonId) {
      dinamicPart = 'PolygonID';
    }

    if (needCompleteKyc && polygonId) {
      dinamicPart = 'KYC and PolygonID';
    }

    return `We need you to go through our simple and quick ${dinamicPart} verification process to continue.`;
  };

  useEffect(() => {
    // KYC first as default
    const KYC = { type: 'KYC' };
    const polygonID = { type: 'PolygonId' };

    if (polygonId && needCompleteKyc) {
      setSteps([KYC, polygonID]);
      return;
    }

    if (polygonId) {
      setSteps([polygonID]);
      return;
    }

    if (needCompleteKyc) {
      setSteps([KYC]);
      return;
    }
  }, [checksStatus]);

  const buttonText = `Start ${steps[currentStep]?.type}`;

  if (!account || !allowed || isVerified) {
    document.body.style.overflow = 'visible';
    return <></>;
  }
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
              <p>{getDescription()}</p>
            </div>

            {steps.map((item, i) => (
              <div
                className={`item ${currentStep === i - 1 ? 'disabled' : ''}`}
                key={`${item}${i}`}
              >
                <img src={checkIcon} height="26px" width="26px" alt="Check" />
                <h4>
                  {i + 1}. {item.type}
                </h4>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button
              style={{ color: buttonTextColor, backgroundColor: primaryColor }}
              onClick={openIframe}
              className="button-basic"
              id="btn-verify"
            >
              {buttonText}
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
            src={`http://localhost:3000/?${new URLSearchParams(
              params
            ).toString()}`}
            frameBorder="0"
            allow="camera"
          />
        </div>
      )}

      <div className="bg" />
    </div>
  );
};

export default GateKeeperModal;
