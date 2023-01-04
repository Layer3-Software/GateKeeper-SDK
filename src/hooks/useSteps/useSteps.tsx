import { useEffect, useState } from 'react';
import { Steps } from '../../components/GateKeeperModal/GateKeeperModal';
import { statusProps } from '../useVerified/useVerified';

const useSteps = ({
  polygonId,
  needCompleteKyc,
  checksStatus,
}: {
  polygonId: boolean;
  needCompleteKyc: boolean;
  checksStatus: statusProps;
}) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [steps, setSteps] = useState<Steps[]>([]);

  const updateSteps = (currentStep: Steps) => {
    const rest = steps.filter(step => step.type !== currentStep.type);
    setSteps([{ type: currentStep.type, complete: true }, ...rest]);
    console.log(currentStep, 'currentStep');
    console.log(steps[stepIndex], 'con el index');

    if (currentStep.complete) {
      setStepIndex(prevStep => prevStep + 1);
    }
  };

  useEffect(() => {
    const KYC = { type: 'KYC', complete: false };
    const polygonID = { type: 'PolygonId', complete: false };

    if (polygonId && needCompleteKyc) {
      setSteps([polygonID, KYC]);
      return;
    }

    if (polygonId) {
      setSteps([polygonID]);
      return;
    }

    if (needCompleteKyc) {
      setSteps([KYC]);
      return;
    }
  }, [checksStatus]);

  return { stepIndex, steps, updateSteps };
};

export default useSteps;
