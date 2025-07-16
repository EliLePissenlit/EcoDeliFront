export function addParams(url: string, params: Record<string, string>) {
  const urlObject = new URL(url, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    urlObject.searchParams.set(key, value);
  });

  return urlObject.pathname + urlObject.search;
}
