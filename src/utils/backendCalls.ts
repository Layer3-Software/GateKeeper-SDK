import { PolygonAuthorizationResponse } from '../types';
import { STAGING_BACKEND_URL, PRODUCTION_BACKEND_URL } from './constants';

const makeRequest = (
  url: string,
  method: string,
  isStaging?: boolean,
  body?: any,
  options?: {
    credentials?: boolean;
  }
) => {
  const isGETmethod = method === 'GET';

  const fetchUrl = isStaging ? STAGING_BACKEND_URL : PRODUCTION_BACKEND_URL;

  const finalURL = isGETmethod
    ? `${url}?${new URLSearchParams(body).toString()}`
    : url;

  return fetch(fetchUrl + finalURL, {
    method,
    mode: 'cors',
    credentials: options?.credentials ? 'include' : 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: isGETmethod ? null : JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const doChecksCheck = (
  address: string,
  ids: string,
  isStaging: boolean
) => {
  return makeRequest('/check', 'GET', isStaging, { address, ids });
};

export const doRoleCheck = (
  role: string,
  isStaging: boolean,
  dryRun?: boolean
) => {
  return makeRequest(
    '/checkRole',
    'GET',
    isStaging,
    { role, dryRun },
    { credentials: true }
  );
};

export const getNonce = (address: string, isStaging: boolean) => {
  return makeRequest('/wallets/nonce', 'GET', isStaging, { address });
};

export const login = (
  walletAddress: string,
  signature: string,
  isStaging: boolean,
  forApp?: boolean
) => {
  return makeRequest('/wallets/login', 'POST', isStaging, {
    walletAddress,
    signature,
    forApp,
  });
};

export const register = (
  address: string,
  signature: string,
  appId: any,
  isStaging: boolean
) => {
  return makeRequest('/users/register', 'POST', isStaging, {
    address,
    signature,
    appId,
  });
};

export const authenticateDomain = (domain: string, isStaging: boolean) => {
  return makeRequest('/authenticate', 'GET', isStaging, { domain });
};

export const polyogonAuth = (
  isStaging: boolean
): Promise<PolygonAuthorizationResponse> => {
  return makeRequest(
    '/users/polygon',
    'GET',
    isStaging,
    {},
    { credentials: true }
  );
};
