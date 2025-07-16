type Endianness = 'LE' | 'BE';

const endianness = (): Endianness => {
  const buffer = new ArrayBuffer(4);
  const uint32Array = new Uint32Array(buffer);
  const uint8Array = new Uint8Array(buffer);
  uint32Array[0] = 0xdeadbeef;
  if (uint8Array[0] === 0xef) return 'LE';
  if (uint8Array[0] === 0xde) return 'BE';
  throw new Error('Unknown endianness');
};

const unsignedBEUIntToHexValue = (beInt: number): string => {
  const hexString = beInt.toString(16);
  const paddedHexString = hexString.padStart(hexString.length + (hexString.length % 2), '0');
  if (endianness() === 'BE') return paddedHexString;
  return paddedHexString.match(/../g)?.reverse().join('') ?? '';
};

const getCookie = (cname: string): string | null => {
  const cookies = document.cookie.split('; ');
  const cookiePrefix = `${cname}=`;
  // eslint-disable-next-line no-restricted-syntax
  for (const cookie of cookies) {
    if (cookie.startsWith(cookiePrefix)) {
      return decodeURIComponent(cookie.slice(cookiePrefix.length));
    }
  }
  return null;
};

const decodeCookie = (cookie: string): string | null => {
  try {
    const binaryCookie = Buffer.from(cookie, 'base64');
    const unsignedInt = [];
    for (let i = 0; i < 4; i += 1) {
      unsignedInt[i] = binaryCookie.readUInt32BE(i * 4);
    }
    const hexArray = unsignedInt.map(unsignedBEUIntToHexValue);
    return hexArray.join('').toUpperCase();
  } catch (error) {
    return null;
  }
};

// Récupération de la valeur d'un cookie par son nom (version alternative)
const getCookieValue = (cname: string): string | false => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
};

// Définition d'un cookie
const setCookie = (cookieName: string, cookieValue: string, expirationDays: number): void => {
  const d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export { getCookie, setCookie, decodeCookie, getCookieValue };
