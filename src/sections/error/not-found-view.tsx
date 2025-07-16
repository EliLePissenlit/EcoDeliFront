import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
// ----------------------------------------------------------------------

export default function NotFoundView() {
  const { t } = useTranslate();

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h1" sx={{ mb: 2 }} fontSize={32}>
          {t('pages.404.title')}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>{t('pages.404.description')}</Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </m.div>

      <Button component={RouterLink} href="/dashboard" size="large" variant="gradient">
        {t('pages.404.button')}
      </Button>
    </MotionContainer>
  );
}
