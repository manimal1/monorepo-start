import { Button, Typography } from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useTheme } from '~/providers/ThemeProvider';
import clsx from 'clsx';

export const ThemeToggleButton = ({ isOpen = false }: { isOpen?: boolean }) => {
  const { toggleTheme } = useTheme();

  return (
    <div className={clsx('text-center', isOpen ? 'px-4' : 'px-2')}>
      <Button
        variant="contained"
        className="w-full rounded p-2"
        onClick={toggleTheme}
        startIcon={<ContrastIcon />}
      >
        <Typography
          className={clsx(isOpen ? 'opacity-100' : 'hidden opacity-0')}
        >
          Toggle Theme
        </Typography>
      </Button>
    </div>
  );
};
