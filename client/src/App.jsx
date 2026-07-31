import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './state/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SetPassword from './pages/SetPassword';
import PasswordRecovery from './pages/PasswordRecovery';
import Admin from './pages/Admin';
import Demo from './pages/Demo';

function Guard({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to={role === 'admin' ? '/admin/login' : '/login'} replace />;
  if (user.rol !== role) return <Navigate to={user.rol === 'admin' ? '/admin' : '/portal'} replace />;
  return children;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login portal="cliente" />} />
    <Route path="/admin/login" element={<Login portal="admin" />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/establecer-contrasena" element={<SetPassword />} />
    <Route path="/recuperar-contrasena" element={<PasswordRecovery />} />
    <Route path="/restablecer-contrasena" element={<PasswordRecovery reset />} />
    <Route path="/portal/*" element={<Guard role="cliente"><Demo /></Guard>} />
    <Route path="/admin/*" element={<Guard role="admin"><Admin /></Guard>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
