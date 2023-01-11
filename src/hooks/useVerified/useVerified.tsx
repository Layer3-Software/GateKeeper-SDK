import { useEffect, useState } from 'react';
import { check } from '../../utils/backendCalls';
import { ONE_CHECK_ERROR } from '../../utils/constants';

interface Error {
  error: string;
}
export interface statusProps {
  [typeOfCheck: string]: boolean | string;
}

const useVerified = (
  address: string,
  ids: string,
  hasPolygonID: boolean,
  checkCallback: any
) => {
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
        setIsVerified(Object.values(response).every(val => val === true));
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
};

export default useVerified;
