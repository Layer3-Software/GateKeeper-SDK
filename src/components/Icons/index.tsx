import React from 'react';
import KYCIcon from '../../assets/KYCIcon.png';
import PolygonIdIcon from '../../assets/polygonId.png';

const Icons = ({ checkType }: { checkType: string }) => {
  switch (checkType) {
    case 'KYC':
      return <img alt="KYC" src={KYCIcon} />;

    case 'PolygonId':
      return <img alt="KYC" src={PolygonIdIcon} />;

    default:
      <></>;
  }

  return <></>;
};

export default Icons;
