import { useEffect, useState } from 'react';
import {
  ChecksResponse,
  KeyBooleanPair,
  nftClaimLinksInterface,
} from '../components/GateKeeperModal/types';
import { doChecksCheck, doRoleCheck } from '../utils/backendCalls';
import { ONE_CHECK_ERROR } from '../utils/constants';

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
  checksIds: string[] = [],
  roles: string[] = [],
  hasPolygonID: boolean,
  checkCallback: any,
  nftClaimLinks: nftClaimLinksInterface | undefined
) => {
  const [isVerified, setIsVerified] = useState(true);
  const [nftFailed, setNftFailed] = useState('');
  const [checksStatus, setChecksStatus] = useState<KeyBooleanPair>({});
  const idsToCheck = checksIds ? checksIds.join(',') : '';

  const isVerifiedByRoles = async (): Promise<boolean> => {
    try {
      for (const role of roles) {
        console.log(role, 'role');

        const res = await doRoleCheck(role);
        console.log(res, 'res');
      }

      return false;
    } catch (error) {
      console.error(`Error on isVerifiedByRoles", ${error}`);

      return false;
    }
  };

  useEffect(() => {
    const detector = async () => {
      try {
        const checksResponse: ChecksResponse & Error = await doChecksCheck(
          address,
          idsToCheck
        );

        // const isValidByRoles =
        // await isVerifiedByRoles();

        if (nftClaimLinks) {
          const idFailed = findFailedNft(checksResponse);
          setNftFailed(idFailed);
        }

        if (checksResponse.error === ONE_CHECK_ERROR && hasPolygonID) {
          return setIsVerified(false);
        }

        const status = transformData(checksResponse);

        setChecksStatus(status);
        setIsVerified(Object.values(status).every(val => val === true));
      } catch (error) {
        setIsVerified(true);
      }
    };

    const customCallBack = async () => {
      const response: ChecksResponse & Error = await doChecksCheck(
        address,
        idsToCheck
      );
      checkCallback(response || {});
    };

    if (checkCallback) customCallBack();
    else detector();
  }, [address]);

  return { isVerified, checksStatus, nftFailed };
};

export default useVerified;
