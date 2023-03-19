import React from 'react';
import '../styles.css';
import ErrorIcon from '../../assets/error.png';
import { ErrorScreenProps } from '../../types';

const ErrorScreen = ({
  error,
  customization,
  type,
  nftClaimLink,
  goBackCallback,
}: ErrorScreenProps) => {
  const { primaryColor, buttonTextColor } = customization;

  const Error = () => {
    const failCheck = `${error?.toUpperCase()} check failed.`;
    const apiError = `Error: ${error}`;

    const toShow = type === 'apiError' ? apiError : failCheck;
    return (
      <>
        <h3>We’re sorry, but something went wrong.</h3>
        <h3>{toShow}</h3>
      </>
    );
  };

  return (
    <div className="modal-body">
      <>
        <img src={ErrorIcon} alt="Error image" />
        <div className="modal-text">
          <h1
            style={{
              borderBottom: `3px solid ${primaryColor}`,
              display: 'inline-block',
              gap: '10px',
              lineHeight: '2em',
            }}
          >
            Oh no!
          </h1>
          <Error />
        </div>

        {goBackCallback ? (
          <button
            onClick={goBackCallback}
            className="button-basic"
            style={{
              color: buttonTextColor,
              backgroundColor: primaryColor,
            }}
          >
            Try again!
          </button>
        ) : null}

        {nftClaimLink ? (
          <button
            onClick={() => window.open(nftClaimLink, '_blank')}
            className="button-basic"
            style={{
              color: buttonTextColor,
              backgroundColor: primaryColor,
            }}
          >
            Claim NFT
          </button>
        ) : null}
      </>
    </div>
  );
};

export default ErrorScreen;
