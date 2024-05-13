import { createRoot } from 'react-dom/client';
import { BrowserRouter , Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import App from './App';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/Dashboard';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import RoutesApp from './routes/Routes';


const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const BlockedRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (user) {
    return <Navigate to="/Dashboard" />;
  }

  return children;
};

const Layout = () => {
  const location = useLocation();
  const hideOnRoutes = ['/', '/login'];
  const showComponents = !hideOnRoutes.includes(location.pathname);
  const user = localStorage.getItem('user');

  if (!user) {
    return (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='*' element={<RoutesApp/>}></Route>
        </Routes>
    );
  } else {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {showComponents && <Dashboard />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {showComponents && <Toolbar />}
          <Routes>
            <Route path="/" element={<Navigate replace to="/Dashboard" />} />
            <Route path="/login" element={<BlockedRoute><Login /></BlockedRoute>} />
            <Route path="*" element={<RoutesApp />}/>
          </Routes>
        </Box>
      </Box>
    );
  }
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Layout />} />
    </Routes>
    <NotificationContainer />
  </BrowserRouter>
);




