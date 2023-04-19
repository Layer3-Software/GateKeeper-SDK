import { useEffect, useState } from 'react';
import {
  ChecksResponse,
  IuseVerified,
  KeyBooleanPair,
  PolygonAuthorizationResponse,
} from '../types';
import {
  doChecksCheck,
  doRoleCheck,
  polyogonAuth,
} from '../utils/backendCalls';
import { ONE_CHECK_ERROR, POLYGON_DID_ERROR } from '../utils/constants';

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

const useVerified = ({
  account,
  checkCallback,
  checksIds,
  roles,
  nftClaimLinks,
  hasPolygonID,
  isStaging,
}: IuseVerified) => {
  const [isVerified, setIsVerified] = useState(true);
  const [nftFailed, setNftFailed] = useState('');
  const [status, setStatus] = useState<{
    response: KeyBooleanPair | PolygonAuthorizationResponse | any;
    someItemFailed?: boolean;
    failedItem?: string | undefined;
    shouldGetDID?: boolean;
    showVcModal?: boolean;
  }>({
    someItemFailed: false,
    failedItem: undefined,
    shouldGetDID: false,
    response: {},
    showVcModal: false,
  });
  const [apiError, setApiError] = useState('');
  const idsToCheck = checksIds ? checksIds.join(',') : '';

  const checkRoles = async (
    dryRun: boolean
  ): Promise<{ isVerified: boolean } | undefined> => {
    try {
      const res = await Promise.all(
        roles.map(async role => doRoleCheck(role, dryRun))
      );

      if (res) {
        const errorOnCalls = res.find(res => res.error);
        if (errorOnCalls) {
          if (errorOnCalls?.error === POLYGON_DID_ERROR) {
            const res = await polyogonAuth(isStaging);
            setIsVerified(false);
            setStatus({
              showVcModal: true,
              shouldGetDID: true,
              response: res,
            });
            return { isVerified: false };
          }

          setApiError(errorOnCalls.error);
          setIsVerified(false);
          return { isVerified: false };
        }

        const allRolesPassed = res.every(res => res.passed === true);

        if (allRolesPassed && dryRun) {
          return await checkRoles(false);
        }

        if (allRolesPassed && !dryRun) {
          const vcIdsArray = res.map(res => res.vcs[0]);

          if (!vcIdsArray) {
            setIsVerified(true);
            return { isVerified: true };
          }

          setStatus({
            showVcModal: true,
            response: { vcIdsArray },
          });
          return { isVerified: true };
        }

        setStatus({
          someItemFailed: true,
          failedItem: 'Roles',
          response: {},
        });
        setIsVerified(false);
        return { isVerified: false };
      }
      return { isVerified: false };
    } catch (error) {
      console.error(`Error on check roles:", ${error}`);
      setIsVerified(false);
      return { isVerified: false };
    }
  };

  const cheksIds = async (): Promise<{ isVerified: boolean }> => {
    try {
      const checksResponse: ChecksResponse & Error = await doChecksCheck(
        account,
        idsToCheck,
        isStaging
      );

      if (nftClaimLinks) {
        const idFailed = findFailedNft(checksResponse);
        setNftFailed(idFailed);
      }

      if (checksResponse?.error === ONE_CHECK_ERROR && hasPolygonID) {
        setIsVerified(false);
        return { isVerified: false };
      }

      if (checksResponse?.error) {
        setApiError(checksResponse.error);
        setIsVerified(false);
        return { isVerified: false };
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
      if (allChecksPassed) {
        setIsVerified(true);
        return { isVerified: true };
      }

      setIsVerified(false);
      return { isVerified: false };
    } catch (error) {
      setIsVerified(false);
      return { isVerified: false };
    }
  };

  useEffect(() => {
    const detector = async () => {
      if (checksIds.length) return await cheksIds();
      else return await checkRoles(true);
    };

    const customCallBack = async () => {
      let response: any;

      if (checksIds.length) response = await cheksIds();
      else response = await checkRoles(true);

      checkCallback(response || {});
    };

    if (checkCallback) customCallBack();
    else detector();
  }, [account]);

  return { isVerified, status, nftFailed, apiError };
};

export default useVerified;
