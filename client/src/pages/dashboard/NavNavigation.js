import React from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

function AppBar({ handleDrawer }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');  // Elimina el usuario de localStorage
        navigate('/login');              // Redirige al usuario a la página de inicio de sesión
      };
  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2 }}
          onClick={handleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Mi Dashboard
        </Typography>
        <LockIcon onClick={handleLogout}>
          Cerrar Sesión
        </LockIcon>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;