import { useState } from 'react';

const useSteps = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    setCurrentStep(prevActiveStep => prevActiveStep + 1);
  };

  return { currentStep, handleNext };
};

export default useSteps;
