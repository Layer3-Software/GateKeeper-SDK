import React from 'react';
import '../GateKeeperModal/GateKeeperModal.css';
import ErrorIcon from '../../assets/error.png';

interface Props {
  failedCheck: string;
  goBackCallback?: () => void;
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

        <h3>{`We’re sorry, but something went wrong with your ${failedCheck}.`}</h3>
      </div>
      {goBackCallback ? (
        <button
          onClick={goBackCallback}
          className="button-basic"
          id="btn-verify"
        >
          Try again!
        </button>
      ) : null}
    </div>
  );
};

export default ErrorScreen;
