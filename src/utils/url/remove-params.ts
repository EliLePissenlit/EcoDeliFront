import { removeLastSlash } from './remove-last-slash';

export function removeParams(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);
    return removeLastSlash(urlObj.pathname);
  } catch (error) {
    return url;
  }
}
