import { SocialIcon } from 'react-social-icons';

import { Stack, Container } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';

import { MotionViewport } from 'src/components/animate';

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    path: 'https://www.facebook.com/',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    path: 'https://www.instagram.com/',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    path: 'https://www.linkedin.com/',
  },
];

export default function Socials(): React.ReactNode {
  const theme = useTheme();
  return (
    <Container component={MotionViewport} sx={{ textAlign: 'center' }}>
      <Stack direction="row" spacing={2} justifyContent="center">
        {_socials.map((social) => (
          <SocialIcon
            key={social.value}
            url={social.path}
            bgColor={theme.palette.primary.main}
            style={{ height: 40, width: 40 }}
          />
        ))}
      </Stack>
    </Container>
  );
}
