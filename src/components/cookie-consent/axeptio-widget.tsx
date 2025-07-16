import { useEffect } from 'react';

import { AXEPTIO_CLIENT_ID, AXEPTIO_COOKIES_VERSION } from 'src/config-global';

declare global {
  interface Window {
    axeptioSettings?: {
      clientId: string;
      cookiesVersion: string;
    };
  }
}

const clientId = AXEPTIO_CLIENT_ID;
const cookiesVersion = AXEPTIO_COOKIES_VERSION;

export default function AxeptioWidget() {
  useEffect(() => {
    window.axeptioSettings = {
      clientId,
      cookiesVersion,
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = '//static.axept.io/sdk.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.axeptioSettings;
    };
  }, []);

  return null;
}
