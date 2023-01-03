import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_COLORS } from '../..//utils/constants';
import './GateKeeperModal.css';
import { ModalProps } from './GateKeeperModal.d';
import accountIcon from '../../assets/account.png';
import externalLinkIcon from '../../assets/linkext.png';
import logotext from '../../assets/logotext.png';
import useLocation from '../../hooks/useLocation';
import useVerified from '../../hooks/useVerified';
import CheckStatus from '../../assets/checkStatus';
import SuccessIcon from '../../assets/success.png';
import ErrorScreen from '../ErrorScreen';

export interface Steps {
  type: string;
  complete: boolean;
}

export enum Types {
  POLYGON_ID = 'PolygonID',
  KYC = 'KYC',
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
  const IS_POPUP = 'true';
  const needCompleteKyc = checksStatus.KYC === false;
  document.body.style.overflow = 'hidden';
  const openIframe = () => setIsFrameOpen(true);
  const closeIframe = () => setIsFrameOpen(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Steps[]>([]);
  const [sucessSteps, setSucessSteps] = useState<{ [key: string]: boolean }>(
    {}
  );

  const updateSteps = (currentStep: Steps) => {
    if (currentStep.complete) return;
    const rest = steps.filter(step => step.type !== currentStep.type);
    setSteps([{ type: currentStep.type, complete: true }, ...rest]);
    setStepIndex(prevStep => prevStep + 1);
  };

  useEffect(() => {
    const KYC = { type: Types.KYC, complete: false };
    const polygonID = { type: Types.POLYGON_ID, complete: false };

    if (polygonId && needCompleteKyc) {
      setSteps([KYC, polygonID]);
      setSucessSteps({
        [Types.POLYGON_ID]: false,
        [Types.KYC]: false,
      });
      return;
    }

    if (polygonId) {
      setSteps([polygonID]);
      setSucessSteps({ [Types.POLYGON_ID]: false });
      return;
    }

    if (needCompleteKyc) {
      setSteps([KYC]);
      setSucessSteps({ [Types.KYC]: false });
      return;
    }
  }, [checksStatus]);

  useEffect(() => {
    window.addEventListener('message', recieveMessage);

    return () => {
      window.removeEventListener('message', recieveMessage);
    };
  }, [steps]);

  const shouldShowKyc = steps[stepIndex]?.type === Types.KYC;
  const shouldShowPolygon = steps[stepIndex]?.type === Types.POLYGON_ID;
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

  const getSuccessDescription = () => {
    if (hasCompleteAllSteps) return 'You have completed all checks!';

    if (steps.length === 1) {
      // We handle cases where there is only one step with a single check
      if (sucessSteps[Types.KYC]) {
        return 'You have completed the KYC verification process.';
      }

      if (sucessSteps[Types.POLYGON_ID]) {
        return 'You have completed the PolygonId process.';
      }
    }

    if (sucessSteps[Types.KYC]) {
      return `You have completed the KYC verification process. Let's go
       through the Polygon ID process.`;
    }

    if (sucessSteps[Types.POLYGON_ID]) {
      return `You have completed the PolygonId process. Let's go
       through the KYC process.`;
    }

    return '';
  };

  const buttonText = steps[stepIndex]?.type
    ? `Start ${steps[stepIndex]?.type}`
    : `Continue`;

  const recieveMessage = useCallback(
    (data: MessageEvent) => {
      try {
        const dataObj = JSON.parse(data.data);
        if (dataObj.type === Types.POLYGON_ID) {
          if (dataObj.isClaimSuccessful) {
            updateSteps(steps[stepIndex]);
            setSucessSteps({ ...sucessSteps, [Types.POLYGON_ID]: true });
            closeIframe();
          }
          return;
        }

        if (dataObj.type === Types.KYC) {
          if (dataObj.isVerified) {
            updateSteps(steps[stepIndex]);
            setSucessSteps({ ...sucessSteps, [Types.KYC]: true });
            closeIframe();
          } else {
            setError(Types.KYC);
            closeIframe();
          }
        }
      } catch (error) {}
    },
    [steps, stepIndex]
  );

  const onGoBack = () => {
    setError('');
    setStepIndex(0);
  };

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
          {error ? (
            <ErrorScreen failedCheck="KYC" goBackCallback={onGoBack} />
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
                  onClick={
                    hasCompleteAllSteps
                      ? () => console.log('closee modal')
                      : openIframe
                  }
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
