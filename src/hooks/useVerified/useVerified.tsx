import { useEffect, useState } from 'react';
import { check } from '../../utils/backendCalls';

export interface statusProps {
  [typeOfCheck: string]: boolean; // KYC: true/false
}

function useVerified(address: string, ids: string, checkCallback: any) {
  const [isVerified, setIsVerified] = useState(true);
  const [checksStatus, setChecksStatus] = useState<statusProps>({});

  useEffect(() => {
    const detector = async () => {
      const response = await check(address, ids);

      try {
        const status = response as statusProps;
        setChecksStatus(status);
        setIsVerified(!Object.values(status).some(val => val === false));
      } catch (error) {
        setIsVerified(true);
      }
    };

    const customCallBack = async () => {
      const response: statusProps = (await check(address, ids)) || {};
      checkCallback(response);
    };

    if (checkCallback) customCallBack();
    else detector();
  }, [address]);

  return { isVerified, checksStatus };
}

export default useVerified;
