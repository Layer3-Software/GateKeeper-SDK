import React from 'react';
import '../GateKeeperModal/GateKeeperModal.css';
import ErrorIcon from '../../assets/error.png';

interface Props {
  failedCheck: string;
  goBackCallback?: () => void;
  isApiError?: boolean;
  nftClaimLink?: string;
}

const ErrorScreen = ({
  failedCheck,
  isApiError,
  goBackCallback,
  nftClaimLink,
}: Props) => {
  const failCheck = `${failedCheck.toUpperCase()} check failed`;
  const apiError = `Error: ${failedCheck}`;

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

        <h3
          style={{ lineHeight: '1.5em' }}
        >{`We’re sorry, but something went wrong. \n ${
          isApiError ? apiError : failCheck
        }.`}</h3>
      </div>
      {goBackCallback ? (
        <button
          onClick={goBackCallback}
          className="button-basic"
          id="btn-success"
        >
          Try again!
        </button>
      ) : null}

      {nftClaimLink ? (
        <button
          onClick={() => window.open(nftClaimLink, '_blank')}
          className="button-basic"
          id="btn-success"
        >
          Claim NFT
        </button>
      ) : null}
    </div>
  );
};

export default ErrorScreen;
