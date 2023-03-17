import React from 'react';
import '../styles.css';
import { QRCodeSVG } from 'qrcode.react';
import GateKeeperLogo from '../../assets/logotext.png';
import { openPolygonSocket } from '../../utils/polygonSocket';
import { QrcodeProps } from '../../types';

const QrCode = ({
  title,
  subTitle,
  qrData,
  customization,
  handleSocketResponse,
}: QrcodeProps) => {
  const { backgroundColor, textColor } = customization;

  openPolygonSocket({ id: qrData.sessionId, callback: handleSocketResponse });

  const qrValue = JSON.stringify(qrData.request);
  return (
    <div
      className="modal"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <div className="modal-body">
        <img src={GateKeeperLogo} alt="GateKeeper logo" />
        <div className="modal-text">
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
        </div>
        <QRCodeSVG includeMargin size={300} value={qrValue} />
      </div>
    </div>
  );
};

export default QrCode;
