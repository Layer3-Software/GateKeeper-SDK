import React, { useState } from 'react';
import { MODAL_NOT_ALLOWED, WEBSITE } from '../..//utils/constants';
import './LayerModal.css';
import { ModalProps, ModalTextProps } from './LayerModal.d';
import accountIcon from '../../assets/account.png';
import verifyIcon from '../../assets/verification.png';
import timeIcon from '../../assets/time.png';
import externalLinkIcon from '../../assets/linkext.png';
import useLocation from '../../hooks/useLocation';
import useVerified from '../../hooks/useVerified';

const LayerModal = ({
  kycType,
  geoIds,
  account,
  modalColor = '#141724',
}: ModalProps) => {
  const [iFrameOpen, setIsFrameOpen] = useState(false);
  const allowed = useLocation(geoIds);
  const isVerified = useVerified(account);

  document.body.style.overflow = 'hidden';

  if (!account) {
    document.body.style.overflow = 'visible';
    return <></>;
  }

  if (!allowed) {
    document.body.style.overflow = 'visible';

    return <></>;
  }
  if (isVerified) {
    document.body.style.overflow = 'visible';
    return <></>;
  }

  const openIframe = () => {
    setIsFrameOpen(true);
  };

  console.log('kycType: ', kycType);

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
        <div style={{ backgroundColor: modalColor }} className="modal">
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
            <a
              id="btn-link"
              href={`${WEBSITE}/verification?bg=red`}
              target="iframe_a"
            >
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

            <div className="powered">
              Powered by <span id="kyc">KYCENGINE</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal">
          <iframe
            id="myframe"
            className="modal-iframe"
            style={{ backgroundColor: modalColor }}
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