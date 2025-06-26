import React, { useState } from 'react'
import './App.css'
import './locales/i18n';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme, darkTheme } from './theme/theme';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home';



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { i18n } = useTranslation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <CssBaseline />
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        currentLang={i18n.language}
        onChangeLanguage={handleChangeLanguage}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
