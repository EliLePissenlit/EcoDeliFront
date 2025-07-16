import * as Yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useTranslate } from 'src/locales';

import { useSnackbar } from 'src/components/snackbar';

import { useCreatePricingConfigMutation } from 'src/types/graphql/typeDefs';

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  basePriceSmall: number;
  basePriceMedium: number;
  basePriceLarge: number;
  pricePerKm: number;
  pricePerMinute: number;
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSuccess?: VoidFunction;
  config?: any;
  type: 'create' | 'edit' | 'view';
};

export default function PricingConfigModal({ open, onClose, onSuccess, config, type }: Props) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const [createPricingConfig] = useCreatePricingConfigMutation();

  const CreatePricingConfigSchema = Yup.object().shape({
    name: Yup.string().required(
      `${t('sections.pricingAdministration.configs.modal.name')} ${t('components.form.required')}`
    ),
    basePriceSmall: Yup.number()
      .required(
        `${t('sections.pricingAdministration.configs.modal.base_price_small')} ${t(
          'components.form.required'
        )}`
      )
      .min(0, t('components.form.required')),
    basePriceMedium: Yup.number()
      .required(
        `${t('sections.pricingAdministration.configs.modal.base_price_medium')} ${t(
          'components.form.required'
        )}`
      )
      .min(0, t('components.form.required')),
    basePriceLarge: Yup.number()
      .required(
        `${t('sections.pricingAdministration.configs.modal.base_price_large')} ${t(
          'components.form.required'
        )}`
      )
      .min(0, t('components.form.required')),
    pricePerKm: Yup.number()
      .required(
        `${t('sections.pricingAdministration.configs.modal.price_per_km')} ${t(
          'components.form.required'
        )}`
      )
      .min(0, t('components.form.required')),
    pricePerMinute: Yup.number()
      .required(
        `${t('sections.pricingAdministration.configs.modal.price_per_minute')} ${t(
          'components.form.required'
        )}`
      )
      .min(0, t('components.form.required')),
  });

  const {
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesProps>({
    resolver: yupResolver(CreatePricingConfigSchema),
    defaultValues: {
      name: '',
      basePriceSmall: 0,
      basePriceMedium: 0,
      basePriceLarge: 0,
      pricePerKm: 0,
      pricePerMinute: 0,
    },
  });

  useEffect(() => {
    if (config && (type === 'edit' || type === 'view')) {
      setValue('name', config.name);
      setValue('basePriceSmall', config.basePriceSmall);
      setValue('basePriceMedium', config.basePriceMedium);
      setValue('basePriceLarge', config.basePriceLarge);
      setValue('pricePerKm', config.pricePerKm);
      setValue('pricePerMinute', config.pricePerMinute);
    } else {
      reset();
    }
  }, [config, type, setValue, reset]);

  const onSubmit = async (data: FormValuesProps) => {
    if (type === 'view') {
      onClose();
      return;
    }

    try {
      if (type === 'create') {
        await createPricingConfig({
          variables: {
            input: {
              name: data.name,
              basePriceSmall: data.basePriceSmall,
              basePriceMedium: data.basePriceMedium,
              basePriceLarge: data.basePriceLarge,
              pricePerKm: data.pricePerKm,
              pricePerMinute: data.pricePerMinute,
            },
          },
        });
        enqueueSnackbar(t('sections.pricingAdministration.configs.notifications.create_success'));
      }
      // TODO: Add edit mutation when available

      reset();
      onClose();
      onSuccess?.();
    } catch (error) {
      enqueueSnackbar(
        type === 'create'
          ? t('sections.pricingAdministration.configs.notifications.create_error')
          : t('sections.pricingAdministration.configs.notifications.update_error'),
        { variant: 'error' }
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'create':
        return t('sections.pricingAdministration.configs.modal.create_title');
      case 'edit':
        return t('sections.pricingAdministration.configs.modal.edit_title');
      case 'view':
        return t('sections.pricingAdministration.configs.modal.view_title');
      default:
        return '';
    }
  };

  const getSubmitButtonText = () => {
    switch (type) {
      case 'create':
        return t('sections.pricingAdministration.configs.modal.create');
      case 'edit':
        return t('sections.pricingAdministration.configs.modal.save');
      case 'view':
        return t('sections.pricingAdministration.configs.modal.close');
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{getTitle()}</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label={t('sections.pricingAdministration.configs.modal.name')}
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={type === 'view'}
            />

            <TextField
              fullWidth
              type="number"
              label={t('sections.pricingAdministration.configs.modal.base_price_small')}
              {...register('basePriceSmall', { valueAsNumber: true })}
              error={!!errors.basePriceSmall}
              helperText={errors.basePriceSmall?.message}
              disabled={type === 'view'}
            />

            <TextField
              fullWidth
              type="number"
              label={t('sections.pricingAdministration.configs.modal.base_price_medium')}
              {...register('basePriceMedium', { valueAsNumber: true })}
              error={!!errors.basePriceMedium}
              helperText={errors.basePriceMedium?.message}
              disabled={type === 'view'}
            />

            <TextField
              fullWidth
              type="number"
              label={t('sections.pricingAdministration.configs.modal.base_price_large')}
              {...register('basePriceLarge', { valueAsNumber: true })}
              error={!!errors.basePriceLarge}
              helperText={errors.basePriceLarge?.message}
              disabled={type === 'view'}
            />

            <TextField
              fullWidth
              type="number"
              label={t('sections.pricingAdministration.configs.modal.price_per_km')}
              {...register('pricePerKm', { valueAsNumber: true })}
              error={!!errors.pricePerKm}
              helperText={errors.pricePerKm?.message}
              disabled={type === 'view'}
            />

            <TextField
              fullWidth
              type="number"
              label={t('sections.pricingAdministration.configs.modal.price_per_minute')}
              {...register('pricePerMinute', { valueAsNumber: true })}
              error={!!errors.pricePerMinute}
              helperText={errors.pricePerMinute?.message}
              disabled={type === 'view'}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            {t('sections.pricingAdministration.configs.modal.cancel')}
          </Button>

          <Button type="submit" variant="gradient" disabled={isSubmitting}>
            {getSubmitButtonText()}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
