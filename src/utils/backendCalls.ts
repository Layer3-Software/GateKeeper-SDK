import { BACKEND_URL } from './constants';

const makeRequest = (url: string, method: string, body?: any) => {
  const isGETmethod = method === 'GET';

  const finalURL = isGETmethod
    ? `${url}?${new URLSearchParams(body).toString()}`
    : url;

  return fetch(BACKEND_URL + finalURL, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: isGETmethod ? null : JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const getPolygonClaims = () => {
  return makeRequest('/claims', 'GET');
};

export const doChecksCheck = (address: string, ids: string) => {
  return makeRequest('/check', 'GET', { address, ids });
};

export const doRoleCheck = (role: string) => {
  return makeRequest('/checkRole', 'GET', { role });
};

export const getNonce = (address: string) => {
  return makeRequest('/wallets/nonce', 'GET', { address });
};

export const login = (
  walletAddress: string,
  signature: string,
  forApp?: boolean
) => {
  return makeRequest('/wallets/login', 'POST', {
    walletAddress,
    signature,
    forApp,
  });
};

export const register = (address: string, signature: string, appId: any) => {
  return makeRequest('/users/register', 'POST', { address, signature, appId });
};

export const authenticateDomain = (domain: string) => {
  return makeRequest('/authenticate', 'GET', { domain });
};
