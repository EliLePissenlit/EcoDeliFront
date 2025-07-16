import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

type Props = {
  password: string;
};

export function PasswordStrength({ password }: Props) {
  const theme = useTheme();
  const { t } = useTranslate();
  const calculateStrength = () => {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[^\w]/.test(password)) score += 1;

    return score;
  };

  const strength = calculateStrength();

  const getColor = () => {
    if (strength <= 2) return theme.palette.error.main;
    if (strength <= 3) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getLabel = () => {
    if (strength <= 2) return t('components.form.password_too_weak');
    if (strength <= 3) return t('components.form.password_weak');
    return t('components.form.password_strong');
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            sx={{
              height: 8,
              width: 40,
              mx: 0.5,
              borderRadius: 1,
              bgcolor: index < strength ? getColor() : 'divider',
            }}
          />
        ))}
      </Box>
      <Typography variant="caption" sx={{ color: getColor() }}>
        {getLabel()}
      </Typography>
    </Box>
  );
}
