import React, { useState } from 'react';
import { Box, Paper, Tabs, Tab, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoginForm from '../../sections/auth/form/LoginForm';
import RegisterForm from '../../sections/auth/form/RegisterForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Auth = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <Tab label={t('login')} />
          <Tab label={t('register')} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <RegisterForm />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Auth; 