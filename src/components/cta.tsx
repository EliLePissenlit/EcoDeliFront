import { m } from 'framer-motion';

import { Box } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';
import BorderAnimatedButton from 'src/components/button/border-animated-button';

export default function CTA() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslate();
  const router = useRouter();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push(paths.dashboard);
    } else {
      router.push(paths.auth.signUp);
    }
  };

  return (
    <Box component={MotionViewport} sx={{ textAlign: 'center', py: { xs: 5, md: 5 } }}>
      <m.div variants={varFade().inUp}>
        <BorderAnimatedButton onClick={handleClick}>
          {t('sections.home.cta.button')}
        </BorderAnimatedButton>
      </m.div>
    </Box>
  );
}
