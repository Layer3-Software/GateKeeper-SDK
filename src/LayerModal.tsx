import React, { useState } from 'react';
import { MODAL_NOT_ALLOWED, WEBSITE } from './utils/constants';
import accountIcon from './assets/account.png';
import verifyIcon from './assets/verification.png';
import timeIcon from './assets/time.png';
import externalLinkIcon from './assets/linkext.png';
import './Modal.css';
import useLocation from './hooks/useLocation';
import useVerified from './hooks/useVerified';
import { ModalProps, ModalTextProps } from './LayerModal.d';

const LayerModal = ({
  kycType,
  projectId,
  externalCountries,
  account,
}: ModalProps) => {
  const [iFrameOpen, setIsFrameOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const allowed = useLocation(externalCountries);
  const isVerified = useVerified(account);

  if (!account) return <></>;
  if (isClosed) return <></>;
  if (!allowed) return <></>;
  if (isVerified) return <></>;

  const openIframe = () => {
    setIsFrameOpen(true);
  };

  const onCloseModal = () => {
    setIsFrameOpen(false);
    setIsClosed(true);
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

  return (
    <div>
      {!iFrameOpen ? (
        <div className="modal">
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
            <div className="modal-average">
              <img src={timeIcon} alt="time" width="20px" height="20px" />
              <p id="average">Average verification time: 5 minutes</p>
            </div>
            <a id="btn-link" href={WEBSITE} target="iframe_a">
              <button
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
            </a>

            {/* <button
              onClick={onCloseModal}
              className="button-basic"
              id="btn-browse"
            >
              Keep browsing
            </button> */}

            <div className="powered">
              Powered by <span id="kyc">KYCENGINE</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal">
          <iframe
            className="modal-iframe"
            name="iframe_a"
            src="target.html"
            frameBorder="0"
          ></iframe>
        </div>
      )}

      <div className="bg" />
    </div>
  );
};

export default LayerModal;
