import { useEffect, useState } from 'react';
import {
  ChecksResponse,
  KeyBooleanPair,
  nftClaimLinksInterface,
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

const findFailedNft = (response: ChecksResponse) => {
  const nftId = Object.keys(response?.type || {}).find(
    key => response?.type[key] === 'NFT'
  );

  if (nftId && response?.hasOwnProperty(nftId)) {
    if (response[nftId] === false) return nftId;
    return '';
  }
  return '';
};

const useVerified = (
  address: string,
  ids: string,
  hasPolygonID: boolean,
  checkCallback: any,
  nftClaimLinks: nftClaimLinksInterface | undefined
) => {
  const [isVerified, setIsVerified] = useState(true);
  const [nftFailed, setNftFailed] = useState('');
  const [checksStatus, setChecksStatus] = useState<KeyBooleanPair>({});

  useEffect(() => {
    const detector = async () => {
      const response: ChecksResponse & Error = await check(address, ids);

      if (nftClaimLinks) {
        const idFailed = findFailedNft(response);
        setNftFailed(idFailed);
      }

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

  return { isVerified, checksStatus, nftFailed };
};

export default useVerified;
