import { DecodedToken } from 'src/types/token';

import axios from './axios';

const jwtDecode = (token: string): DecodedToken => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }

  const decoded: DecodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const getTokenType = (token: string | null): string | undefined | null => {
  if (!token) return null;
  const decodedToken: DecodedToken = jwtDecode(token);
  return decodedToken?.type;
};

const getTokenFromLocalStorage = (): string | null => window.localStorage.getItem('token');

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('token', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { setSession, isValidToken, getTokenType, getTokenFromLocalStorage };
