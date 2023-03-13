import { KeyBooleanPair, Types } from '../components/GateKeeperModal';

export const getDescription = (
  kycCompleted: boolean,
  existPolygonData: boolean
) => {
  let dinamicPart =
    kycCompleted && existPolygonData
      ? 'KYC and PolygonID'
      : kycCompleted
      ? 'KYC'
      : 'PolygonID';
  return `We need you to go through our simple and quick ${dinamicPart} verification process to continue.`;
};

export const getSuccessDescription = (
  sucessSteps: KeyBooleanPair,
  hasCompleteAllSteps: boolean,
  stepsLength: number
) => {
  const kycStepCompleted = sucessSteps[Types.KYC];
  const polygonStepCompleted = sucessSteps[Types.PolygonID];

  if (hasCompleteAllSteps) {
    return 'You have completed all checks!';
  }

  if (!kycStepCompleted && !polygonStepCompleted) {
    return '';
  }

  const message = `You have completed the ${
    kycStepCompleted ? 'KYC verification process.' : 'PolygonId process.'
  }`;

  return stepsLength > 1
    ? `${message} Let's go through the ${
        kycStepCompleted ? 'PolygonId process.' : 'KYC verification process.'
      }`
    : message;
};
