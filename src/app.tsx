/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import 'src/locales/i18n';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';

import { SnackbarProvider } from 'src/components/snackbar';
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { AuthProvider } from 'src/contexts/auth';
import NavigateBackComponent from './components/go-previous-page';
import ScrollTo from './components/scroll-to';
import { CustomCursor } from './components/custom-cursor';
import ThirdPartyWidgets from './components/third-party/third-party-widgets';

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'horizontal', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default',
            themeStretch: false,
            borderRadius: 8,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <ProgressBar />
                <Router />
                <ScrollTo />
                <NavigateBackComponent />
                <CustomCursor />
                <ThirdPartyWidgets />
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
