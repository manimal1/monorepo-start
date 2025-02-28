import clsx from 'clsx';
import {
  IconButton,
  Drawer as MuiDrawer,
  Divider,
  List,
  Typography,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Chat as ChatIcon,
  SpaceDashboard as SpaceDashboardIcon,
} from '@mui/icons-material';
import { NavMenuDrawerItem } from '~/components/navigation/NavMenuDrawerItem';
import { ThemeToggleButton } from '~/components/ThemeToggleButton';

interface NavMenuDrawerProps {
  isOpen: boolean;
  toggle: () => void;
}

export function NavMenuDrawer({ isOpen, toggle }: NavMenuDrawerProps) {
  return (
    <div className="flex">
      <MuiDrawer
        variant="permanent"
        open={isOpen}
        className="relative flex-shrink-0"
      >
        <div
          className={clsx(
            'flex h-screen flex-col overflow-hidden transition-all',
            isOpen ? `w-[220px]` : 'w-[56px]',
          )}
        >
          <div className="flex items-center p-2">
            <Typography
              className={clsx(
                'w-full self-center text-center',
                isOpen ? 'ml-3 opacity-100' : 'hidden opacity-0',
              )}
            >
              Aisist
            </Typography>
            <IconButton onClick={toggle} className="self-end">
              {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {/* Drawer List */}
          <List>
            <NavMenuDrawerItem
              label="Dashboard"
              icon={<SpaceDashboardIcon />}
              isOpen={isOpen}
              url="/"
            />
            <NavMenuDrawerItem
              label="Chat"
              icon={<ChatIcon />}
              isOpen={isOpen}
              url="/chat"
            />
          </List>
          <ThemeToggleButton isOpen={isOpen} />
        </div>
      </MuiDrawer>
    </div>
  );
}
