const sortUrlParams = (urlSearchParams: URLSearchParams): URLSearchParams => {
  const sortedParams: Record<string, string> = {};
  const keys = Array.from(urlSearchParams.keys()).sort();

  for (const key of keys) {
    sortedParams[key] = urlSearchParams.get(key) ?? "";
  }

  return new URLSearchParams(sortedParams);
};

export default sortUrlParams;
