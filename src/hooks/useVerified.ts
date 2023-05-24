import { useContext, useEffect, useState } from 'react';
import { GateKeeperContext } from '../context/GatekeeperContext';
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
    (key) => response?.type[key] === 'NFT'
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
}: IuseVerified) => {
  const { isStaging, isLoggedIn, simulateKYC } = useContext(GateKeeperContext);
  const [isVerified, setIsVerified] = useState(true);
  const [nftFailed, setNftFailed] = useState('');
  const [isChecking, setIsChecking] = useState(false);
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
      setIsChecking(true);
      const res = await Promise.all(
        roles.map(async (role) => doRoleCheck(role, isStaging, dryRun))
      );

      if (res) {
        const errorOnCalls = res.find((res) => res.error);
        if (errorOnCalls) {
          if (errorOnCalls?.error === POLYGON_DID_ERROR) {
            const res = await polyogonAuth(isStaging);
            setIsVerified(false);
            setStatus({
              showVcModal: true,
              shouldGetDID: true,
              response: res,
            });
            setIsChecking(false);
            return { isVerified: false };
          }

          setApiError(errorOnCalls.error);
          setIsVerified(false);
          setIsChecking(false);
          return { isVerified: false };
        }

        const allRolesPassed = res.every((res) => res.passed === true);

        if (allRolesPassed && dryRun) {
          return await checkRoles(false);
        }

        if (allRolesPassed && !dryRun) {
          const vcIdsArray = res.map((res) => res.vcs[0]);

          if (!vcIdsArray) {
            setIsVerified(true);
            setIsChecking(false);
            return { isVerified: true };
          }

          setStatus({
            showVcModal: true,
            response: { vcIdsArray },
          });
          setIsChecking(false);
          return { isVerified: true };
        }

        if (simulateKYC) {
          setIsVerified(false);
          setIsChecking(false);
          setStatus({
            someItemFailed: false,
            failedItem: 'Roles',
            response: {
              KYC: false,
            },
          });
          return;
        }

        setStatus({
          someItemFailed: true,
          failedItem: 'Roles',
          response: {},
        });

        setIsVerified(false);
        setIsChecking(false);
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
      setIsChecking(true);
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
        setIsChecking(false);
        return { isVerified: false };
      }

      if (checksResponse?.error) {
        setApiError(checksResponse.error);
        setIsVerified(false);
        setIsChecking(false);
        return { isVerified: false };
      }

      const status = transformData(checksResponse);

      const notPassedCheck = Object.keys(status).find((key) => {
        if (key === 'KYC') return;
        return status[key as keyof typeof status] === false;
      });

      setStatus({
        someItemFailed: Boolean(notPassedCheck),
        failedItem: notPassedCheck,
        response: status,
      });

      const allChecksPassed = Object.values(status).every(
        (val) => val === true
      );
      if (allChecksPassed) {
        setIsVerified(true);
        setIsChecking(false);
        return { isVerified: true };
      }

      setIsVerified(false);
      setIsChecking(false);
      return { isVerified: false };
    } catch (error) {
      setIsChecking(false);
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

    if (!isLoggedIn) return;
    if (checkCallback) customCallBack();
    else detector();
  }, [account, isLoggedIn]);

  return { isVerified, status, nftFailed, apiError, isChecking };
};

export default useVerified;
