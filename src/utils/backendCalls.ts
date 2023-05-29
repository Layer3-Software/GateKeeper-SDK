const PRODUCTION_BACKEND_URL = "https://api.gatekeeper.software/v1";
const STAGING_BACKEND_URL =
  "https://gk-prod-backend-staging.azurewebsites.net/v1";

import axios, { AxiosRequestConfig } from "axios";

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

  const config: AxiosRequestConfig = {
    method,
    url: fetchUrl + finalURL,
    headers: { "Content-Type": "application/json" },
    data: isGETmethod ? undefined : JSON.stringify(body),
  };

  return axios(config)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return err;
    });
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
