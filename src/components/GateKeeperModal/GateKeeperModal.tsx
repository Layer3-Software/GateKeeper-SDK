import React from 'react';
import { DEFAULT_COLORS } from '../..//utils/constants';
import './GateKeeperModal.css';
import { ModalProps } from '.';
import useAuth from '../../hooks/useAuth';
import Modal from '../Modal';
import accountIcon from '../../assets/account.png';

const GateKeeperModal = ({
  account,
  polygonId,
  checkIds,
  checkCallback,
  customization,
  nftClaimLinks,
  roles,
}: ModalProps) => {
  const { doLogin, isLoggedIn, loginStatus } = useAuth();
  document.body.style.overflow = 'hidden';

  const {
    backgroundColor,
    buttonTextColor,
    primaryColor,
    textColor,
  } = customization ? customization : DEFAULT_COLORS;

  if (!isLoggedIn) {
    return (
      <div
        style={{ backgroundColor: backgroundColor, color: textColor }}
        className="modal"
      >
        <div className="modal-body">
          <>
            <img src={accountIcon} width="260px" alt="account" />

            <div className="modal-text">
              <h2>Let’s start your journey</h2>
            </div>
          </>
          <button
            id="btn-success"
            style={{ color: buttonTextColor, backgroundColor: primaryColor }}
            onClick={doLogin}
            className="button-basic"
          >
            Login
          </button>
          <h3 style={{ marginTop: '15px' }}>{loginStatus}</h3>
        </div>
      </div>
    );
  }

  return (
    <Modal
      account={account}
      checkCallback={checkCallback}
      checkIds={checkIds}
      roles={roles}
      customization={customization}
      polygonId={polygonId}
      nftClaimLinks={nftClaimLinks}
    />
  );
};

export default GateKeeperModal;
