import { Stack, Button, TextField, InputAdornment } from '@mui/material';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filters: {
    name: string;
  };
  onFilters: (name: string, value: string) => void;
  onCreateNew: VoidFunction;
};

export default function PricingConfigsTableToolbar({ filters, onFilters, onCreateNew }: Props) {
  const { t } = useTranslate();

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          fullWidth
          value={filters.name}
          onChange={(event) => onFilters('name', event.target.value)}
          placeholder={t('sections.pricingAdministration.configs.table.search')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="gradient"
          size="large"
          startIcon={<Iconify icon="eva:plus-fill" sx={{ color: 'white' }} />}
          onClick={onCreateNew}
        >
          {t('sections.pricingAdministration.configs.table.new_config')}
        </Button>
      </Stack>
    </Stack>
  );
}
