export const hasParams = (url: string): boolean => {
  const queryString = url.split('?')[1];
  return queryString ? new URLSearchParams(queryString).toString().length > 0 : false;
};
