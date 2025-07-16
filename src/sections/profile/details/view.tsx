import { useSnackbar } from 'notistack';

import { Box, Grid, Card, Container, Typography } from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';

import { fDateTime } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';

import { useUpdateUserMutation, useUploadAvatarMutation } from 'src/types/graphql/typeDefs';

import { AvatarForm } from './forms/avatar-form';
import { UserInfoForm, UserInfoFormData } from './forms/user-info-form';

export default function Details() {
  const { t } = useTranslate();
  const { user, refetchMe } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [updateUser, { loading: updateLoading }] = useUpdateUserMutation({
    onCompleted: () => {
      enqueueSnackbar(t('profile.details.update_success'), { variant: 'success' });
      refetchMe();
    },
  });

  const [uploadAvatar, { loading: uploadLoading }] = useUploadAvatarMutation({
    onCompleted: () => {
      enqueueSnackbar(t('profile.details.avatar_update_success'), { variant: 'success' });
      refetchMe();
    },
  });

  const handleUpdateUser = async (data: UserInfoFormData) => {
    await updateUser({
      variables: {
        input: {
          ...data,
          phone: data.phone.replace(/\s/g, ''),
        },
      },
    });
  };

  const handleUpdateAvatar = async (file: File) => {
    await uploadAvatar({
      variables: {
        file,
      },
    });
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card variant="blur" sx={{ p: 3, textAlign: 'center' }}>
            <AvatarForm
              onSubmit={handleUpdateAvatar}
              loading={uploadLoading}
              currentAvatar={user.avatar}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card variant="blur" sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('profile.details.title')}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('common.member_since')}: {fDateTime(user.createdAt)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('common.last_updated')}: {fDateTime(user.updatedAt)}
              </Typography>
            </Box>

            <UserInfoForm
              onSubmit={handleUpdateUser}
              loading={updateLoading}
              defaultValues={{
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
