import React from 'react';
import '../styles.css';
import Modal from '../Modal';
import GateKeeperContextProvider from '../../context/GatekeeperContext';
import { IexternalContext } from '../../context/types';
import { GateKeeperModalProps } from '../../types';
import Login from '../Login';
import { DEFAULT_COLORS } from '../../utils/constants';

const GateKeeperModal = ({
  account,
  polygonId,
  checksIds,
  checkCallback,
  customization,
  nftClaimLinks,
  isStaging,
  roles,
  signer,
}: GateKeeperModalProps) => {
  document.body.style.overflow = 'hidden';
  const contextData: IexternalContext = {
    isStaging: isStaging || false,
    signer,
    address: account,
    customization: customization || DEFAULT_COLORS,
  };

  if (!account) return null;

  return (
    <GateKeeperContextProvider data={contextData}>
      <>
        <Login />
        <Modal
          checkCallback={checkCallback}
          checksIds={checksIds}
          roles={roles}
          customization={customization}
          polygonId={polygonId}
          nftClaimLinks={nftClaimLinks}
        />
      </>
    </GateKeeperContextProvider>
  );
};

export default GateKeeperModal;
