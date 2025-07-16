import Divider from '@mui/material/Divider';
import type { Theme, SxProps } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type FormDividerProps = {
  sx?: SxProps<Theme>;
  label?: React.ReactNode;
};

export function FormDivider({ sx, label = 'common.or' }: FormDividerProps) {
  const { t } = useTranslate();

  return (
    <Divider
      sx={{
        my: 3,
        typography: 'overline',
        color: 'text.disabled',
        '&::before, :after': { borderTopStyle: 'dashed' },
        ...sx,
      }}
    >
      {t('common.or')}
    </Divider>
  );
}
