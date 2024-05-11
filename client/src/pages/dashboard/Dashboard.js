import React from 'react';
import { CssBaseline, Box, Toolbar, Typography } from '@mui/material';
import AppBar from './NavNavigation';
import Drawer from './listItems';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar />
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" align="Left" gutterBottom>
          Dashboard
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
