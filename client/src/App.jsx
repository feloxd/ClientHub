import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './state/AuthContext';
import Landing from './pages/Landing';

const Login = lazy(() => import('./pages/Login'));
const SetPassword = lazy(() => import('./pages/SetPassword'));
const PasswordRecovery = lazy(() => import('./pages/PasswordRecovery'));
const Admin = lazy(() => import('./pages/Admin'));
const Demo = lazy(() => import('./pages/Demo'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

function Guard({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to={role === 'admin' ? '/admin/login' : '/login'} replace />;
  if (user.rol !== role) return <Navigate to={user.rol === 'admin' ? '/admin' : '/portal'} replace />;
  return children;
}

export default function App() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#061729] text-sm font-bold text-cyan">Loading Seals HVAC…</div>}><Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/services/:slug" element={<ServicePage />} />
    <Route path="/:page" element={<LegalPage />} />
    <Route path="/login" element={<Login portal="cliente" />} />
    <Route path="/admin/login" element={<Login portal="admin" />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/establecer-contrasena" element={<SetPassword />} />
    <Route path="/recuperar-contrasena" element={<PasswordRecovery />} />
    <Route path="/restablecer-contrasena" element={<PasswordRecovery reset />} />
    <Route path="/portal/*" element={<Guard role="cliente"><Demo /></Guard>} />
    <Route path="/admin/*" element={<Guard role="admin"><Admin /></Guard>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Suspense>;
}
