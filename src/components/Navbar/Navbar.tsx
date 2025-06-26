import React from 'react';
import { AppBar, Toolbar, IconButton, Box, InputBase, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoginIcon from '@mui/icons-material/Login';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';


const LANGUAGES = [
  { code: 'fr', flag: '🇫🇷' },
  { code: 'en', flag: '🇬🇧' },
];

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentLang: string;
  onChangeLanguage: (lng: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, onToggleDarkMode, currentLang, onChangeLanguage }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLangChange = (lng: string) => {
    onChangeLanguage(lng);
    handleMenuClose();
  };

  const currentFlag = LANGUAGES.find(l => l.code === currentLang)?.flag || LANGUAGES[0].flag;
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={isDarkMode ? '/logoEcoDeliBlack.svg' : '/logoEcoDeliLight.svg'}
            alt="EcoDeli Logo"
            sx={{ width: 70, height: 'auto', mr: 2, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        </Box>
        {/* Recherche + Déposer une annonce */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 700, ml: 2, mr: 2 }}>
          <Button
            text={t('postAd')}
            to="/deposer-annonce"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: theme.palette.background.paper, borderRadius: 999, px: 2, py: 0.5, flex: 1, boxShadow: 1, ml: 2 }}>
            <InputBase
              placeholder={t('searchPlaceholder')}
              inputProps={{ 'aria-label': t('searchPlaceholder') }}
              sx={{ flex: 1, color: 'inherit', fontSize: 16 }}
              disabled
            />
            <IconButton sx={{ color: theme.palette.secondary.main }} disabled>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Langue + Darkmode + Login */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
         
          <IconButton onClick={handleMenuClick} sx={{ fontSize: 24 }}>
            <span style={{ fontSize: 24 }}>{currentFlag}</span>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {LANGUAGES.map(lang => (
              <MenuItem key={lang.code} selected={currentLang === lang.code} onClick={() => handleLangChange(lang.code)}>
                <span style={{ fontSize: 24 }}>{lang.flag}</span>
              </MenuItem>
            ))}
          </Menu>
          <IconButton onClick={onToggleDarkMode} sx={{ ml: 1 }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {isLoggedIn ? (
            <Button
              text={t('logout')}
              icon={<LogoutIcon />}
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
                window.location.reload();
              }}
            />
          ) : (
            <Button
              text={t('login')}
              icon={<LoginIcon />}
              to="/login"
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 