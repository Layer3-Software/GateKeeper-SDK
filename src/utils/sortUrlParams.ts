const sortUrlParams = (urlSearchParams: URLSearchParams) => {
  const sortedParams: { [key: string]: string | null } = {};
  const keys = Array.from(urlSearchParams.keys()).sort();

  for (const key of keys) {
    sortedParams[key] = urlSearchParams.get(key);
  }
};

export default sortUrlParams;
