import { Outlet } from 'react-router';
import { NavMenuDrawer } from '~/components/navigation/NavMenuDrawer';
import { useState } from 'react';
import clsx from 'clsx';

export function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  const handleDrawerToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <div className="flex">
        <nav className={clsx(isOpen ? 'flex-[220px]' : 'flex-[56px]')}>
          <NavMenuDrawer isOpen={isOpen} toggle={handleDrawerToggle} />
        </nav>
        <main
          className={clsx(
            'h-dvh p-4',
            isOpen ? 'flex-[calc(100%-220px)}]' : 'flex-[calc(100%-56px)]',
          )}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
