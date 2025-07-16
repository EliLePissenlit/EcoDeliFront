import Link from '@mui/material/Link';
import type { LinkProps } from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import Iconify from './iconify';

// ----------------------------------------------------------------------

type FormReturnLinkProps = LinkProps & {
  href: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
};

export function FormReturnLink({ sx, href, children, label, icon, ...other }: FormReturnLinkProps) {
  const { t } = useTranslate();

  return (
    <Link
      component={RouterLink}
      href={href}
      color="inherit"
      variant="subtitle2"
      sx={{
        mt: 3,
        gap: 0.5,
        mx: 'auto',
        alignItems: 'center',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {icon || <Iconify width={16} icon="eva:arrow-ios-back-fill" />}
      {label || t('components.form.return_to_sign_in')}
    </Link>
  );
}
