import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactsIcon from '@mui/icons-material/Contacts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import VerifiedIcon from '@mui/icons-material/Verified';
import CategoryIcon from '@mui/icons-material/Category';
import DifferenceIcon from '@mui/icons-material/Difference';
import InventoryIcon from '@mui/icons-material/Inventory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ShieldIcon from '@mui/icons-material/Shield';
import SellIcon from '@mui/icons-material/Sell';

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Dashboard() {
  const [openInventory, setOpenInventory] = React.useState(false);
  const [openSecurity, setOpenSecurity] = React.useState(false);
  const [openFacture, setOpenFacture] = React.useState(false);


  const clickInventory = () => {
    setOpenInventory(!openInventory);
  };

  const clickFacture = () => {
    setOpenFacture(!openFacture);
  };

  const clickSecurity = () => {
    setOpenSecurity(!openSecurity);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} >
            Inventario
          </Typography>
            <IconButton
            color="inherit"
            onClick={handleLogout}
            sx={{ ml: 'auto' }}
            >
            <FontAwesomeIcon icon={faRightFromBracket} />
            </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<ProductionQuantityLimitsIcon />}
                </ListItemIcon>
                <ListItemText primary={"Inventario"} sx={{ opacity: open ? 1 : 0 }} onClick={clickInventory} />
                {openInventory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
                <Collapse in={openInventory} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <VerifiedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Producto"/>
                      </ListItemButton>
                    </Link>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <CategoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Categoria"/>
                      </ListItemButton>
                    </Link>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <DifferenceIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Entrada inventario"/>
                      </ListItemButton>
                    </Link>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <DifferenceIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Salida inventario"/>
                      </ListItemButton>
                    </Link>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <InventoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Inventario disponible"/>
                      </ListItemButton>
                    </Link>
                  </List>
                </Collapse>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<SellIcon />}
                </ListItemIcon>
                <ListItemText primary={"Venta"} sx={{ opacity: open ? 1 : 0 }} onClick={clickFacture} />
                {openFacture ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
                <Collapse in={openFacture} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <AssignmentIcon/>
                      </ListItemIcon>
                      <ListItemText primary="Facturas"/>
                    </ListItemButton>
                    </Link>
                  </List>
                </Collapse>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {< ShieldIcon/>}
                </ListItemIcon>
                <ListItemText primary={"Seguridad"} sx={{ opacity: open ? 1 : 0 }} onClick={clickSecurity} />
                {openSecurity ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
                <Collapse in={openSecurity} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AccountBoxIcon/>
                        </ListItemIcon>
                      <ListItemText primary="Usuarios"/>
                    </ListItemButton>
                    </Link>
                    <Link to="/inventario/entrada/List" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <ContactsIcon/>
                        </ListItemIcon>
                      <ListItemText primary="Roles"/>
                    </ListItemButton>
                    </Link>
                  </List>
                </Collapse>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
