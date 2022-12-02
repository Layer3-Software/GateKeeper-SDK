import * as React from 'react';

const Clock = ({ color = '#10B981' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8675 13.3333L9.76584 10.8866V5.61328"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3033 4.6967C18.2323 7.62563 18.2323 12.3744 15.3033 15.3033C12.3744 18.2322 7.62568 18.2322 4.69676 15.3033C1.76783 12.3743 1.76783 7.62562 4.69676 4.6967C7.62569 1.76777 12.3744 1.76777 15.3033 4.6967"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Clock;
