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

const GateKeeperModal = ({
  account,
  polygonId,
  checkIds,
  checkCallback,
  customization,
  nftClaimLinks,
}: ModalProps) => {
  document.body.style.overflow = 'hidden';
  const [iFrameOpen, setIsFrameOpen] = useState(false);
  const Ids = checkIds ? checkIds.join(',') : '';
  const { isVerified, checksStatus, nftFailed } = useVerified(
    account,
    Ids,
    Boolean(polygonId),
    checkCallback
  );

  const IS_POPUP = 'true';
  const needCompleteKyc = checksStatus.KYC === false;
  const openIframe = () => setIsFrameOpen(true);
  const closeIframe = () => setIsFrameOpen(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [error, setError] = useState('');
  const [closeSdk, setCloseSdk] = useState(false);
  const [steps, setSteps] = useState<Steps[]>([]);
  const [sucessSteps, setSucessSteps] = useState<KeyBooleanPair>({});

  const updateSteps = (currentStep: Steps) => {
    if (currentStep.complete) return;
    const rest = steps.filter(step => step.type !== currentStep.type);
    setSteps([{ type: currentStep.type, complete: true }, ...rest]);
    setStepIndex(prevStep => prevStep + 1);
  };

  const closeModal = () => setCloseSdk(true);

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
    window.addEventListener('message', recieveMessage);
    return () => {
      window.removeEventListener('message', recieveMessage);
    };
  }, [steps]);

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

  const getDescription = () => {
    let dinamicPart =
      needCompleteKyc && polygonId
        ? 'KYC and PolygonID'
        : needCompleteKyc
        ? 'KYC'
        : 'PolygonID';
    return `We need you to go through our simple and quick ${dinamicPart} verification process to continue.`;
  };

  const getSuccessDescription = () => {
    if (hasCompleteAllSteps) return 'You have completed all checks!';

    if (!sucessSteps[Types.KYC] && !sucessSteps[Types.PolygonID]) {
      return '';
    }

    const message = `You have completed the ${
      sucessSteps[Types.KYC]
        ? 'KYC verification process.'
        : 'PolygonId process.'
    }`;

    if (steps.length > 1) {
      return `${message} Let's go through the ${
        sucessSteps[Types.KYC]
          ? 'PolygonId process.'
          : 'KYC verification process.'
      }`;
    } else {
      return message;
    }
  };

  const buttonText = steps[stepIndex]?.type
    ? `Start ${steps[stepIndex]?.type}`
    : `Continue`;

  const recieveMessage = useCallback(
    (data: MessageEvent) => {
      try {
        const dataObj = JSON.parse(data.data);
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

  const onGoBack = () => {
    setError('');
    setStepIndex(0);
  };

  const showFailScreen =
    checksStatus.OFAC === false ||
    checksStatus.NFT === false ||
    checksStatus.geoId === false ||
    checksStatus.error;

  if (showFailScreen) {
    const item = Object.keys(checksStatus).find(key => {
      if (key === Types.KYC) return;
      return checksStatus[key] === false;
    });

    return (
      <div
        style={{ backgroundColor: backgroundColor, color: textColor }}
        className="modal"
      >
        <ErrorScreen
          nftClaimLink={nftClaimLinks && nftClaimLinks[nftFailed].claimLink}
          failedCheck={item || ((checksStatus.error as unknown) as string)}
          isApiError={!!checksStatus.error}
        />
      </div>
    );
  }

  if (closeSdk) {
    document.body.style.overflow = 'visible';
    return <></>;
  }

  if (!account || (isVerified && !polygonId)) {
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
          {error ? (
            <ErrorScreen failedCheck={error} goBackCallback={onGoBack} />
          ) : (
            <>
              <div className="modal-body">
                {!hasCompleteOneStep ? (
                  <>
                    <img src={accountIcon} width="260px" alt="account" />

                    <div className="modal-text">
                      <h2>Let’s start your journey</h2>
                      <p>{getDescription()}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={SuccessIcon} alt="successIcon" />
                    <div className="modal-text">
                      <h2>Yeah! You did it!</h2>
                      <p>{getSuccessDescription()}</p>
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
      ) : (
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
      )}

      <div className="bg" />
    </div>
  );
};

export default GateKeeperModal;
