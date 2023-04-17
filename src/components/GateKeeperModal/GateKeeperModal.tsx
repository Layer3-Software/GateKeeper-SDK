import React from 'react';
import { DEFAULT_COLORS } from '../../utils/constants';
import '../styles.css';
import useAuth from '../../hooks/useAuth';
import Modal from '../Modal';
import accountIcon from '../../assets/account.png';
import { ModalProps } from '../../types';
import Container from '../Container';

declare global {
  interface Window {
    isProduction: boolean;
  }
}

const GateKeeperModal = ({
  account,
  polygonId,
  checksIds,
  checkCallback,
  customization,
  nftClaimLinks,
  isProduction,
  roles,
}: ModalProps) => {
  document.body.style.overflow = 'hidden';

  window.isProduction = isProduction || false;

  const { doLogin, isLoggedIn, loginStatus } = useAuth();

  const { backgroundColor, buttonTextColor, primaryColor, textColor } =
    customization || DEFAULT_COLORS;

  if (!isLoggedIn) {
    return (
      <Container bgColor={backgroundColor!} textColor={textColor!}>
        <div className="modal-body">
          <div className="modal-text">
            <img src={accountIcon} width="260px" alt="Account" />
            <h2>Let’s start your journey</h2>
          </div>
          <button
            id="btn-success"
            onClick={doLogin}
            className="button-basic"
            style={{ color: buttonTextColor, backgroundColor: primaryColor }}
          >
            Login
          </button>
          <h3 style={{ marginTop: '15px' }}>{loginStatus}</h3>
        </div>
      </Container>
    );
  }

  return (
    <Modal
      account={account}
      checkCallback={checkCallback}
      checksIds={checksIds}
      roles={roles}
      customization={customization}
      polygonId={polygonId}
      nftClaimLinks={nftClaimLinks}
    />
  );
};

export default GateKeeperModal;
