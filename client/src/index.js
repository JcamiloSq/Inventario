import { createRoot } from 'react-dom/client';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import App from './App';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/Dashboard';

const container = document.getElementById('root');
const root = createRoot(container);
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Dashboard"
        element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
    </Routes>
    <NotificationContainer />
  </BrowserRouter>
);




