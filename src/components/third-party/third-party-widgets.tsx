import VideoAskWidget from 'src/components/video-ask/video-ask-widget';
import AxeptioWidget from 'src/components/cookie-consent/axeptio-widget';

export default function ThirdPartyWidgets({
  showVideoAsk = false,
  showAxeptio = false,
}: {
  showVideoAsk?: boolean;
  showAxeptio?: boolean;
}) {
  return (
    <>
      {showAxeptio && <AxeptioWidget />}
      {showVideoAsk && <VideoAskWidget />}
    </>
  );
}
