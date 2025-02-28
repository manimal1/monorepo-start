import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getMuiTheme } from '@repo/ui';
import { setCssVariables } from '~/utils/setCssVariables';

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<{
  toggleTheme: () => void;
  mode: ThemeMode;
}>({ toggleTheme: () => {}, mode: 'light' });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState<ThemeMode>(prefersDark ? 'dark' : 'light');

  useEffect(() => {
    setCssVariables(mode);
    // Toggle the .dark class on the root element based on the mode
    if (mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={getMuiTheme(mode)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
