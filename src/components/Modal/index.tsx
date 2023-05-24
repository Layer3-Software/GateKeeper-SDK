import React, { useCallback, useContext, useEffect, useState } from 'react';
import useVerified from '../../hooks/useVerified';
import { DEFAULT_COLORS, WEBSITE } from '../../utils/constants';
import CheckStatus from '../../assets/checkStatus';
import logotext from '../../assets/logotext.png';
import accountIcon from '../../assets/account.png';
import externalLinkIcon from '../../assets/linkext.png';
import SuccessIcon from '../../assets/success.png';
import {
  getDescription,
  getStepsArr,
  getSuccessDescription,
} from '../../utils/ModalFunctions';
import VcModal from '../VcModal';
import {
  Steps,
  KeyBooleanPair,
  Types,
  IuseVerified,
  GateKeeperModalProps,
} from '../../types';
import Container from '../../components/Container';
import { GateKeeperContext } from '../../context/GatekeeperContext';
import ErrorScreen from '../ErrorScreen';

const Modal = ({
  checksIds,
  checkCallback,
  nftClaimLinks,
  polygonId,
  customization,
  roles,
}: Partial<GateKeeperModalProps>) => {
  const IS_POPUP = 'true';
  const { isStaging, address } = useContext(GateKeeperContext);
  const [iFrameOpen, setIsFrameOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [errorOnParent, setErrorOnParent] = useState('');
  const [closeSdk, setCloseSdk] = useState(false);
  const [steps, setSteps] = useState<Steps[]>([]);
  const [sucessSteps, setSucessSteps] = useState<KeyBooleanPair>({});
  const hasPolygonID = Boolean(polygonId);

  const paramsToVerified: IuseVerified = {
    account: address,
    checksIds: checksIds || [],
    roles: roles || [],
    checkCallback,
    hasPolygonID,
    nftClaimLinks,
  };

  const { status, isVerified, nftFailed, apiError, isChecking } = useVerified(
    paramsToVerified
  );

  const {
    response,
    someItemFailed,
    failedItem,
    showVcModal,
    shouldGetDID,
  } = status;

  const openIframe = () => setIsFrameOpen(true);
  const closeIframe = () => setIsFrameOpen(false);
  const closeModal = () => setCloseSdk(true);

  useEffect(() => {
    const stepsArr = getStepsArr(Boolean(polygonId), needCompleteKyc);
    setSteps(stepsArr);

    const successSteps = stepsArr.reduce((acc, step) => {
      acc[step.type] = false;
      return acc;
    }, {} as KeyBooleanPair);

    setSucessSteps(successSteps);
  }, [response]);

  useEffect(() => {
    window.addEventListener('message', receiveMessage);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [steps]);

  const needCompleteKyc =
    !showVcModal && (response as KeyBooleanPair).KYC === false;
  const shouldShowKyc = steps[stepIndex]?.type === Types.KYC;
  const shouldShowPolygon = steps[stepIndex]?.type === Types.PolygonID;
  const hasCompleteOneStep = Object.values(sucessSteps).some(step => step);
  const hasCompleteAllSteps = Object.values(sucessSteps).every(step => step);

  const { backgroundColor, buttonTextColor, primaryColor, textColor } =
    customization || DEFAULT_COLORS;

  const params = {
    bgModal: backgroundColor ?? DEFAULT_COLORS.backgroundColor,
    textColor: textColor ?? DEFAULT_COLORS.textColor,
    buttonTextColor: buttonTextColor ?? DEFAULT_COLORS.buttonTextColor,
    primaryColor: primaryColor ?? DEFAULT_COLORS.primaryColor,
    IS_POPUP,
    KYC: shouldShowKyc ? 'true' : 'false',
    polygonId: shouldShowPolygon ? 'true' : 'false',
    address,
  };

  const buttonText = steps[stepIndex]?.type
    ? `Start ${steps[stepIndex]?.type}`
    : `Continue`;

  const receiveMessage = useCallback(
    (data: MessageEvent) => {
      try {
        const dataObj = JSON.parse(data?.data);
        const { type } = dataObj;

        if (![Types.PolygonID].includes(type)) return;

        if (dataObj.isClaimSuccessful) {
          updateSteps(steps[stepIndex]);
          setSucessSteps({ ...sucessSteps, [type]: true });
        } else {
          setErrorOnParent(type);
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
    setErrorOnParent('');
    setStepIndex(0);
  };

  const description = getDescription(needCompleteKyc, !!polygonId);
  const successDescription = getSuccessDescription(
    sucessSteps,
    hasCompleteAllSteps,
    steps.length
  );

  const SHOW_FAIL_SCREEN = someItemFailed || apiError || errorOnParent;
  const SHOW_VC_MODAL = showVcModal;

  const getError = () => {
    if (someItemFailed) {
      return failedItem;
    }
    if (apiError) {
      return apiError;
    }
    if (errorOnParent) {
      return errorOnParent;
    }

    return undefined;
  };

  const MainScreen = () => {
    return (
      <div
        style={{ backgroundColor: backgroundColor, color: textColor }}
        className="modal"
      >
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
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={SuccessIcon} alt="successIcon" />
                  <div className="modal-text">
                    <h2>Yeah! You did it!</h2>
                    <p>{successDescription}</p>
                  </div>
                </div>
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
                </div>
              ))}
            </>
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
      </div>
    );
  };

  const WebsiteIframe = () => {
    const IFRAME_URL = `${WEBSITE}/?${new URLSearchParams(params).toString()}`;

    return (
      <Container bgColor={backgroundColor!} textColor={textColor!}>
        <iframe
          id="gatekeeper-iframe"
          className="modal-iframe"
          style={{ backgroundColor: backgroundColor }}
          name="iframe_a"
          src={IFRAME_URL}
          allow="camera"
        />
      </Container>
    );
  };

  if (isChecking) {
    return (
      <Container bgColor={backgroundColor!} textColor={textColor!}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>Loading...</h1>
        </div>
      </Container>
    );
  }

  if (closeSdk || (isVerified && !polygonId && !showVcModal)) {
    document.body.style.overflow = 'visible';
    return null;
  }

  if (SHOW_VC_MODAL) {
    return (
      <VcModal
        isStaging={isStaging || false}
        roles={roles}
        closeModal={closeModal}
        shouldGetDID={shouldGetDID}
        response={response}
        customization={customization ? customization : DEFAULT_COLORS}
      />
    );
  }

  if (SHOW_FAIL_SCREEN) {
    return (
      <Container bgColor={backgroundColor!} textColor={textColor!}>
        <ErrorScreen
          customization={customization ? customization : DEFAULT_COLORS}
          nftClaimLink={nftClaimLinks && nftClaimLinks[nftFailed]?.claimLink}
          error={getError() ?? ''}
          type={someItemFailed ? 'failedCheck' : 'apiError'}
          goBackCallback={errorOnParent ? onGoBack : undefined}
        />
      </Container>
    );
  }

  return (
    <div>
      {!iFrameOpen ? <MainScreen /> : <WebsiteIframe />}
      <div className="bg" />
    </div>
  );
};

export default Modal;
