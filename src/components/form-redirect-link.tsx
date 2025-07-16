import { Link, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

type FormRedirectLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

export function FormRedirectLink({ text, linkText, href }: FormRedirectLinkProps) {
  return (
    <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
      {text}{' '}
      <Link component={RouterLink} href={href} sx={{ cursor: 'pointer' }} color="text.primary">
        {linkText}
      </Link>
    </Typography>
  );
}
