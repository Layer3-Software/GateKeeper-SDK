import { BACKEND_URL } from './constants';

const makeRequest = (url: string, method: string, body?: any) => {
  const isGETmethod = method === 'GET';

  const finalURL = isGETmethod
    ? `${url}?${new URLSearchParams(body).toString()}`
    : url;

  return fetch(BACKEND_URL + finalURL, {
    method,
    mode: 'cors',
    credentials: 'include',
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

export const check = (address: string, ids: string) => {
  return makeRequest('/check', 'GET', { address, ids });
};
