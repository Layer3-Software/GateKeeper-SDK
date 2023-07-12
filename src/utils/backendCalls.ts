const PRODUCTION_BACKEND_URL = "https://api.gatekeeper.software/v1";
const STAGING_BACKEND_URL =
  "https://gk-prod-backend-staging.azurewebsites.net/v1";

const makeRequest = (
  url: string,
  method: string,
  isStaging: boolean,
  body?: any,
) => {
  const isGETmethod = method === "GET";
  const fetchUrl = isStaging ? STAGING_BACKEND_URL : PRODUCTION_BACKEND_URL;

  const finalURL = isGETmethod
    ? `${url}?${new URLSearchParams(body).toString()}`
    : url;

  return fetch(fetchUrl + finalURL, {
    method,
    mode: "cors",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: isGETmethod ? null : JSON.stringify(body),
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export const getNonce = (address: string, isStaging: boolean) => {
  return makeRequest("/wallets/nonce", "GET", isStaging, { address });
};

export const register = (
  address: string,
  signature: string,
  appId: any,
  isStaging: boolean,
) => {
  return makeRequest("/users/register", "POST", isStaging, {
    address,
    signature,
    appId,
  });
};
