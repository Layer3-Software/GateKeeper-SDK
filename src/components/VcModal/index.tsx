import React, { useState } from 'react';
import { DEFAULT_COLORS, WEBSITE } from '../../utils/constants';
import '../styles.css';
import QrCode from '../QrCode';
import GateKeeperLogo from '../../assets/logotext.png';
import {
  PolygonAuthorizationResponse,
  SocketMessage,
  VcModalProps,
} from '../../types';
import Container from '../Container';
import { doRoleCheck } from '../../utils/backendCalls';

const VcModal = ({
  customization,
  response,
  roles,
  shouldGetDID,
  isStaging,
  closeModal,
}: VcModalProps) => {
  const { backgroundColor, textColor } = customization;
  const [showQrCode, setShowQrCode] = useState(shouldGetDID);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vcIdsArray, setVcIdsArray] = useState<string[]>([]);

  const handleSocketResponse = async (msg: SocketMessage) => {
    if (msg?.error) {
      setError(msg.error);
      return;
    }

    if (msg.success) {
      setShowQrCode(false);
      setIsLoading(true);

      if (roles) {
        await Promise.all(
          roles.map(async role => doRoleCheck(role, isStaging, false))
        );
        const res = await Promise.all(
          roles.map(async role => doRoleCheck(role, isStaging, false))
        );
        if (res) {
          const vcIdsArray = res.map(res => res.vcs[0]);
          setVcIdsArray(vcIdsArray);
          setIsLoading(false);
        }
      }
    }
  };

  if (showQrCode) {
    return (
      <QrCode
        isStaging={isStaging}
        title="Lets fetch your polygon DID!"
        subTitle="Scan this QR code with your Polygon DID app to fetch your DID"
        qrData={response as PolygonAuthorizationResponse}
        handleSocketResponse={handleSocketResponse}
        customization={customization ? customization : DEFAULT_COLORS}
      />
    );
  }

  const VcLinks = () => {
    if (response?.vcIdsArray || vcIdsArray.length) {
      const array = vcIdsArray.length ? vcIdsArray : response.vcIdsArray;
      return array.map((vcId: string) => (
        <a
          key={vcId}
          className="link"
          href={`${WEBSITE}/claim?vcId=${vcId}`}
          target="_blank"
        >
          - {vcId}
        </a>
      ));
    }
    return null;
  };

  return (
    <Container bgColor={backgroundColor!} textColor={textColor!}>
      <>
        <div className="modal-body">
          <img src={GateKeeperLogo} alt="GateKeeper logo" />
          <div className="modal-text">
            <h2>Claim your VCs</h2>
            {isLoading ? <h3>fetching links...</h3> : null}

            <div>
              <VcLinks />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={closeModal} className="button-basic">
            Close
          </button>
          <h3>{error}</h3>
        </div>
      </>
    </Container>
  );
};

export default VcModal;
