import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Iconify from './iconify';
// ----------------------------------------------------------------------

type FormSocialsProps = BoxProps & {
  signInWithGoogle?: () => void;
  singInWithGithub?: () => void;
  signInWithTwitter?: () => void;
};

export function FormSocials({
  sx,
  signInWithGoogle,
  singInWithGithub,
  signInWithTwitter,
  ...other
}: FormSocialsProps) {
  return (
    <Box gap={1.5} display="flex" justifyContent="center" sx={sx} {...other}>
      {signInWithGoogle && (
        <IconButton color="inherit" onClick={signInWithGoogle}>
          <Iconify icon="mdi:google" width={22} />
        </IconButton>
      )}
      {singInWithGithub && (
        <IconButton color="inherit" onClick={singInWithGithub}>
          <Iconify icon="mdi:github" width={22} />
        </IconButton>
      )}
      {signInWithTwitter && (
        <IconButton color="inherit" onClick={signInWithTwitter}>
          <Iconify icon="mdi:twitter" width={22} />
        </IconButton>
      )}
    </Box>
  );
}
