import { useEffect, useState } from 'react';
import {
  ChecksResponse,
  KeyBooleanPair,
  nftClaimLinksInterface,
} from '../components/GateKeeperModal/types';
import { doChecksCheck, doRoleCheck } from '../utils/backendCalls';

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
  checkCallback: any,
  nftClaimLinks: nftClaimLinksInterface | undefined
) => {
  const [isVerified, setIsVerified] = useState(true);
  const [nftFailed, setNftFailed] = useState('');
  const [status, setStatus] = useState<{
    someItemFailed: boolean;
    failedItem: string | undefined;
    response: KeyBooleanPair;
  }>({
    someItemFailed: false,
    failedItem: undefined,
    response: {},
  });
  const [apiError, setApiError] = useState('');
  const idsToCheck = checksIds ? checksIds.join(',') : '';

  const checkRoles = async () => {
    try {
      const res = await Promise.all(roles.map(async role => doRoleCheck(role)));

      const errorOnCalls = res.find(res => res.error);

      if (errorOnCalls) {
        setApiError(errorOnCalls.error);
        setIsVerified(false);
        return;
      }

      const allRolePassed = res.every(res => res.passed === true);

      if (allRolePassed) {
        setIsVerified(true);
        return;
      }

      setStatus({
        someItemFailed: true,
        failedItem: 'Roles',
        response: {},
      });
      setIsVerified(false);
    } catch (error) {
      console.error(`Error on check roles:", ${error}`);
      setIsVerified(true);
    }
  };

  const cheksIds = async () => {
    try {
      const checksResponse: ChecksResponse & Error = await doChecksCheck(
        address,
        idsToCheck
      );

      if (nftClaimLinks) {
        const idFailed = findFailedNft(checksResponse);
        setNftFailed(idFailed);
      }

      if (checksResponse?.error) {
        setApiError(checksResponse.error);
        return setIsVerified(false);
      }

      const status = transformData(checksResponse);

      const notPassedCheck = Object.keys(status).find(key => {
        if (key === 'KYC') return;
        return status[key as keyof typeof status] === false;
      });

      setStatus({
        someItemFailed: Boolean(notPassedCheck),
        failedItem: notPassedCheck,
        response: status,
      });

      const allChecksPassed = Object.values(status).every(val => val === true);
      if (allChecksPassed) setIsVerified(true);

      return setIsVerified(false);
    } catch (error) {
      setIsVerified(true);
    }
  };

  useEffect(() => {
    const detector = async () => {
      if (checksIds.length) return await cheksIds();
      else return await checkRoles();
    };

    const customCallBack = async () => {
      let response: any;

      if (checksIds.length) response = await cheksIds();
      else response = await checkRoles();

      checkCallback(response || {});
    };

    if (checkCallback) customCallBack();
    else detector();
  }, [address]);

  return { isVerified, status, nftFailed, apiError };
};

export default useVerified;
