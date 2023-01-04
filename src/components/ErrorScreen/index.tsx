import React from 'react';
import '../GateKeeperModal/GateKeeperModal.css';
import ErrorIcon from '../../assets/error.png';

interface Props {
  failedCheck: string;
  goBackCallback: () => void;
}

const ErrorScreen = ({ failedCheck, goBackCallback }: Props) => {
  return (
    <div className="modal-body">
      <img src={ErrorIcon} alt="Error image" />
      <div className="modal-text">
        <h1
          style={{
            borderBottom: '3px solid #059669',
            display: 'inline-block',
            gap: '10px',
            lineHeight: '2em',
          }}
        >
          Oh no!
        </h1>

        <p>{`We’re sorry, but something went wrong with your ${failedCheck}.`}</p>
      </div>
      <button onClick={goBackCallback} className="button-basic" id="btn-verify">
        Try again!
      </button>
    </div>
  );
};

export default ErrorScreen;
