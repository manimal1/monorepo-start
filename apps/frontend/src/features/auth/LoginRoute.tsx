import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { LoginForm } from '~/features/auth/LoginForm';
import { SignupForm } from '~/features/auth/SignupForm';

export function LoginRoute() {
  const [value, setValue] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="h-full">
      <Typography variant="h2">Login/Signup page</Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="login page tabs"
          >
            <Tab label="Login" value={0} />
            <Tab label="Signup" value={1} />
          </Tabs>
        </Box>
        <TabPanel value={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={1}>
          <SignupForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
