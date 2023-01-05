import { useEffect, useState } from 'react';
import { check } from '../../utils/backendCalls';

interface Error {
  error: string;
}
export interface statusProps {
  [typeOfCheck: string]: boolean; // KYC: true/false
}

const ONE_CHECK_ERROR = 'Specify at least one check';

function useVerified(
  address: string,
  ids: string,
  hasPolygonID: boolean,
  checkCallback: any
) {
  const [isVerified, setIsVerified] = useState(true);
  const [checksStatus, setChecksStatus] = useState<statusProps>({});

  useEffect(() => {
    const detector = async () => {
      const response: statusProps & Error = await check(address, ids);

      try {
        if (response.error === ONE_CHECK_ERROR && hasPolygonID) {
          return setIsVerified(false);
        }
        setChecksStatus(response);
        setIsVerified(!Object.values(response).some(val => val === false));
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
