import { useEffect, useState } from 'react';
import {
  ChecksResponse,
  KeyBooleanPair,
} from '../../components/GateKeeperModal/types';
import { check } from '../../utils/backendCalls';
import { ONE_CHECK_ERROR } from '../../utils/constants';

interface Error {
  error: string;
}

const transformData = (checksResult: ChecksResponse) => {
  const transformedData: any = {};
  for (const key in checksResult) {
    if (key !== 'type') {
      transformedData[checksResult.type[key]] = checksResult[key];
    }
  }

  return transformedData as KeyBooleanPair;
};

const useVerified = (
  address: string,
  ids: string,
  hasPolygonID: boolean,
  checkCallback: any
) => {
  const [isVerified, setIsVerified] = useState(true);
  const [checksStatus, setChecksStatus] = useState<KeyBooleanPair>({});

  useEffect(() => {
    const detector = async () => {
      const response: ChecksResponse & Error = await check(address, ids);

      try {
        if (response.error === ONE_CHECK_ERROR && hasPolygonID) {
          return setIsVerified(false);
        }

        const status = transformData(response);

        setChecksStatus(status);
        setIsVerified(Object.values(status).every(val => val === true));
      } catch (error) {
        setIsVerified(true);
      }
    };

    const customCallBack = async () => {
      const response: ChecksResponse & Error =
        (await check(address, ids)) || {};
      checkCallback(response);
    };

    if (checkCallback) customCallBack();
    else detector();
  }, [address]);

  return { isVerified, checksStatus };
};

export default useVerified;
