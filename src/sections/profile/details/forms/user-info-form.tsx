import * as Yup from 'yup';
import { FC } from 'react';
import { m } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import i18n from 'src/locales/i18n';
import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

const UserInfoSchema = Yup.object().shape({
  firstName: Yup.string().required(i18n.t('components.form.required')),
  lastName: Yup.string().required(i18n.t('components.form.required')),
  phone: Yup.string()
    .required(i18n.t('components.form.required'))
    .matches(/^[0-9+\s-]+$/, i18n.t('components.form.invalid_phone')),
});

export type UserInfoFormData = Yup.InferType<typeof UserInfoSchema>;

type UserInfoFormProps = {
  onSubmit: (data: UserInfoFormData) => Promise<void>;
  loading: boolean;
  defaultValues?: Partial<UserInfoFormData>;
};

export const UserInfoForm: FC<UserInfoFormProps> = ({ onSubmit, loading, defaultValues }) => {
  const { t } = useTranslate();

  const methods = useForm<UserInfoFormData>({
    resolver: yupResolver(UserInfoSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      phone: defaultValues?.phone || '',
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box gap={3} display="flex" flexDirection="column">
        <m.div variants={varFade().inUp}>
          <RHFTextField name="firstName" label={t('common.first_name')} autoFocus />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="lastName" label={t('common.last_name')} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <RHFTextField name="phone" label={t('common.phone')} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <LoadingButton fullWidth type="submit" variant="gradient" size="large" loading={loading}>
            {t('common.save_changes')}
          </LoadingButton>
        </m.div>
      </Box>
    </FormProvider>
  );
};
