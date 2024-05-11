import React, { useState } from 'react';
import AppBar from './NavNavigation';
import Drawer from './listItems';

function Layout() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar handleDrawer={handleClick} open={open} />
      <Drawer open={open} handleDrawer={handleClick} />
    </>
  );
}

export default Layout;
