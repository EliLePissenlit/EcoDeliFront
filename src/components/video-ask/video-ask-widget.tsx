import { useEffect } from 'react';

import { VIDEOASK_URL } from 'src/config-global';

declare global {
  interface Window {
    VIDEOASK_EMBED_CONFIG?: {
      kind: string;
      url: string;
      options: {
        widgetType: string;
        text: string;
        backgroundColor: string;
        position: string;
        dismissible: boolean;
        videoPosition: string;
      };
    };
  }
}

export default function VideoAskWidget() {
  useEffect(() => {
    window.VIDEOASK_EMBED_CONFIG = {
      kind: 'widget',
      url: VIDEOASK_URL,
      options: {
        widgetType: 'VideoThumbnailExtraLarge',
        text: '',
        backgroundColor: '#060606',
        position: 'bottom-right',
        dismissible: true,
        videoPosition: 'center center',
      },
    };

    const script = document.createElement('script');
    script.src = 'https://www.videoask.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.VIDEOASK_EMBED_CONFIG;
    };
  }, []);

  return null;
}
