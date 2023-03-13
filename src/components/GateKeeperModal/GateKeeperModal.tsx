import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_COLORS, WEBSITE } from '../..//utils/constants';
import './GateKeeperModal.css';
import accountIcon from '../../assets/account.png';
import externalLinkIcon from '../../assets/linkext.png';
import logotext from '../../assets/logotext.png';
import useVerified from '../../hooks/useVerified';
import CheckStatus from '../../assets/checkStatus';
import SuccessIcon from '../../assets/success.png';
import ErrorScreen from '../ErrorScreen';
import { ModalProps, Steps, KeyBooleanPair, Types } from '.';
import useAuth from '../../hooks/useAuth';
import {
  getDescription,
  getSuccessDescription,
} from '../../utils/ModalFunctions';

const GateKeeperModal = ({
  account,
  polygonId,
  checkIds,
  checkCallback,
  customization,
  nftClaimLinks,
  roles,
}: ModalProps) => {
  document.body.style.overflow = 'hidden';

  const [iFrameOpen, setIsFrameOpen] = useState(false);
  const { doLogin, isLoggedIn, loginStatus } = useAuth();
  const { checksStatus, isVerified, nftFailed } = useVerified(
    account,
    checkIds,
    roles,
    Boolean(polygonId),
    checkCallback,
    nftClaimLinks
  );

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [error, setError] = useState('');
  const [closeSdk, setCloseSdk] = useState(false);
  const [steps, setSteps] = useState<Steps[]>([]);
  const [sucessSteps, setSucessSteps] = useState<KeyBooleanPair>({});

  const openIframe = () => setIsFrameOpen(true);
  const closeIframe = () => setIsFrameOpen(false);
  const closeModal = () => setCloseSdk(true);

  const IS_POPUP = 'true';

  useEffect(() => {
    const stepsArr =
      polygonId && needCompleteKyc
        ? [
            { type: Types.KYC, complete: false },
            { type: Types.PolygonID, complete: false },
          ]
        : polygonId
        ? [{ type: Types.PolygonID, complete: false }]
        : needCompleteKyc
        ? [{ type: Types.KYC, complete: false }]
        : [];

    setSteps(stepsArr);

    const successSteps = stepsArr.reduce((acc, step) => {
      acc[step.type] = false;
      return acc;
    }, {} as KeyBooleanPair);

    setSucessSteps(successSteps);
  }, [checksStatus]);

  useEffect(() => {
    window.addEventListener('message', receiveMessage);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [steps]);

  const needCompleteKyc = checksStatus.KYC === false;
  console.log('needCompleteKyc', needCompleteKyc);

  const shouldShowKyc = steps[stepIndex]?.type === Types.KYC;
  const shouldShowPolygon = steps[stepIndex]?.type === Types.PolygonID;
  const hasCompleteOneStep = Object.values(sucessSteps).some(step => step);
  const hasCompleteAllSteps = Object.values(sucessSteps).every(step => step);

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
    KYC: shouldShowKyc ? 'true' : 'false',
    polygonId: shouldShowPolygon ? 'true' : 'false',
    address: account,
  };

  const buttonText = steps[stepIndex]?.type
    ? `Start ${steps[stepIndex]?.type}`
    : `Continue`;

  const receiveMessage = useCallback(
    (data: MessageEvent) => {
      try {
        const dataObj = JSON.parse(data?.data);
        const { type } = dataObj;

        if (![Types.KYC, Types.PolygonID].includes(type)) return;

        if (dataObj.isClaimSuccessful || dataObj.isVerified) {
          updateSteps(steps[stepIndex]);
          setSucessSteps({ ...sucessSteps, [type]: true });
        } else {
          setError(type);
        }
        closeIframe();
      } catch (error) {}
    },
    [steps, stepIndex]
  );

  const updateSteps = (currentStep: Steps) => {
    if (currentStep.complete) return;
    const rest = steps.filter(step => step.type !== currentStep.type);
    setSteps([{ type: currentStep.type, complete: true }, ...rest]);
    setStepIndex(prevStep => prevStep + 1);
  };

  const onGoBack = () => {
    setError('');
    setStepIndex(0);
  };

  const description = getDescription(needCompleteKyc, !!polygonId);
  const successDescription = getSuccessDescription(
    sucessSteps,
    hasCompleteAllSteps,
    steps.length
  );

  const { OFAC, NFT, geoId, error: errorOnChecks } = checksStatus;

  const SHOW_FAIL_SCREEN = !OFAC || !NFT || !geoId || errorOnChecks;

  ///////////// screen //////////

  const MainScreen = () => {
    return (
      <div
        style={{ backgroundColor: backgroundColor, color: textColor }}
        className="modal"
      >
        {error ? (
          <ErrorScreen failedCheck={error} goBackCallback={onGoBack} />
        ) : (
          <>
            <div className="modal-body">
              <>
                {!hasCompleteOneStep ? (
                  <>
                    <img src={accountIcon} width="260px" alt="account" />

                    <div className="modal-text">
                      <h2>Let’s start your journey</h2>
                      <p>{description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={SuccessIcon} alt="successIcon" />
                    <div className="modal-text">
                      <h2>Yeah! You did it!</h2>
                      <p>{successDescription}</p>
                    </div>
                  </>
                )}

                {steps.map((item, i) => (
                  <div
                    style={{
                      color: buttonTextColor,
                      backgroundColor: primaryColor,
                    }}
                    className={`item ${stepIndex === i - 1 ? 'disabled' : ''}`}
                    key={`${item}${i}`}
                  >
                    <CheckStatus color={item.complete ? '#059669' : 'white'} />
                    <h4>
                      {i + 1}. {item.type}
                    </h4>

                    <></>
                  </div>
                ))}
              </>
              )
            </div>

            <div className="modal-footer">
              <button
                style={{
                  color: buttonTextColor,
                  backgroundColor: primaryColor,
                }}
                onClick={hasCompleteAllSteps ? closeModal : openIframe}
                className="button-basic"
                id="btn-success"
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
                <div
                  style={{
                    backgroundColor: `${primaryColor}`,
                    borderRadius: '5px',
                    marginLeft: '5px',
                    padding: '2px',
                  }}
                >
                  <img
                    style={{ marginLeft: '5px' }}
                    src={logotext}
                    alt="logo"
                    width="120px"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const WebsiteIframe = () => {
    return (
      <div className="modal">
        <iframe
          id="myframe"
          className="modal-iframe"
          style={{ backgroundColor: backgroundColor }}
          name="iframe_a"
          src={`${WEBSITE}/?${new URLSearchParams(params).toString()}`}
          allow="camera"
        />
      </div>
    );
  };

  console.log(isLoggedIn, 'islogin');

  // Case user not login
  if (!isLoggedIn) {
    return (
      <div
        style={{ backgroundColor: backgroundColor, color: textColor }}
        className="modal"
      >
        <div className="modal-body">
          <button
            id="btn-success"
            style={{ color: buttonTextColor, backgroundColor: primaryColor }}
            onClick={doLogin}
            className="button-basic"
          >
            Login
          </button>
          <div className="modal-text">
            <h2>{loginStatus}</h2>
          </div>
        </div>
      </div>
    );
  }

  // case user pass all checks
  if (closeSdk || (isVerified && !polygonId)) {
    console.log('entre en pass');

    // we show the scrollbar so the user can scroll
    document.body.style.overflow = 'visible';
    return null;
  }

  // case: errors on checks
  if (SHOW_FAIL_SCREEN) {
    console.log('entre en fail');

    const item = Object.keys(checksStatus).find(key => {
      if (key === Types.KYC) return;
      return checksStatus[key] === false;
    });
    console.log(item, 'item');
    console.log(checksStatus, 'checksStatus');

    return (
      <div
        style={{ backgroundColor: backgroundColor, color: textColor }}
        className="modal"
      >
        <ErrorScreen
          customization={customization ? customization : DEFAULT_COLORS}
          nftClaimLink={nftClaimLinks && nftClaimLinks[nftFailed]?.claimLink}
          failedCheck={item}
          isApiError={!!checksStatus.error}
        />
      </div>
    );
  }

  // handling iframe
  return (
    <div>
      {!iFrameOpen ? <MainScreen /> : <WebsiteIframe />}
      <div className="bg" />
    </div>
  );
};

export default GateKeeperModal;
