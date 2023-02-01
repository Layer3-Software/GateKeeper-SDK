import { useEffect, useState } from 'react';
import { KeyBooleanPair, TCheck } from '../../components/GateKeeperModal/types';
import { check, getChecks } from '../../utils/backendCalls';
import { ONE_CHECK_ERROR } from '../../utils/constants';

interface Error {
  error: string;
}
export interface statusProps {
  [checkID: string]: boolean | string;
}

const buildChecksStatus = (checksStatus: statusProps, userChecks: TCheck[]) => {
  let res: KeyBooleanPair = {};
  userChecks.forEach(check => {
    const statusIds = Object.keys(checksStatus);

    const find = statusIds.find(checkId => checkId === check._id);
    if (find) {
      res[check.type] = Boolean(checksStatus[check._id]);
    }
  });

  return res;
};

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
      const userChecks: TCheck[] = await getChecks();

      try {
        if (response.error === ONE_CHECK_ERROR && hasPolygonID) {
          return setIsVerified(false);
        }

        const status = buildChecksStatus(response, userChecks);

        setChecksStatus(status);
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
