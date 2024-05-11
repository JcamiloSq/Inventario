import React, { useState } from 'react';
import { Drawer as MuiDrawer, List, ListItemIcon, ListItemText, Toolbar, ListItemButton, Collapse, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';

function Drawer() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [openInventory, setOpenInventory] = React.useState(true);
  const [openSecurity, setOpenSecurity] = React.useState(true);
  const [openFacture, setOpenFacture] = React.useState(true);

  const clickInventory = () => {
    setOpenInventory(!openInventory);
  };

  const clickFacture = () => {
    setOpenFacture(!openFacture);
  };

  const clickSecurity = () => {
    setOpenSecurity(!openSecurity);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const drawerWidth = 240;
  const drawerPaper = open ? drawerWidth : 70;

  return (
    <>
    <MuiDrawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerPaper, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      {open && ( <List>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentTurnedInIcon />
          </ListItemIcon>
          <ListItemText primary="Inventario" onClick={clickInventory}/>
          {openInventory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openInventory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Factura" onClick={clickFacture}/>
          {openFacture ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openFacture} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Seguridad" onClick={clickSecurity}/>
          {openSecurity ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSecurity} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    )}
    </MuiDrawer>
    </>
  );
}

export default Drawer;
