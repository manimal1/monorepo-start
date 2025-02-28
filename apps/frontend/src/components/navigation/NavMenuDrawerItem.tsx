import clsx from 'clsx';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface NavMenuDrawerItemProps {
  icon: ReactNode;
  isOpen: boolean;
  label: string;
  url: string;
}

export function NavMenuDrawerItem({
  icon,
  isOpen,
  label,
  url,
}: NavMenuDrawerItemProps) {
  const navigate = useNavigate();

  return (
    <ListItem key={label} disablePadding>
      <ListItemButton
        disableGutters
        className="flex min-h-[48px] items-center"
        onClick={() => navigate(url)}
      >
        <ListItemIcon className="flex min-w-0 items-center justify-center">
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          className={clsx(
            'transition-opacity',
            isOpen ? 'ml-3 opacity-100' : 'hidden opacity-0',
          )}
        />
      </ListItemButton>
    </ListItem>
  );
}
