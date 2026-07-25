import { createContext, useContext, useMemo, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('nexo_user') || 'null'));
  const login = async (email, password, portal) => {
    const { data } = await api.post('/auth/login', { email, password, portal });
    localStorage.setItem('nexo_access', data.accessToken);
    localStorage.setItem('nexo_refresh', data.refreshToken);
    localStorage.setItem('nexo_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };
  const logout = async () => {
    try { await api.post('/auth/logout', { refreshToken: localStorage.getItem('nexo_refresh') }); } catch { /* sesión local se limpia siempre */ }
    localStorage.removeItem('nexo_access');
    localStorage.removeItem('nexo_refresh');
    localStorage.removeItem('nexo_user');
    setUser(null);
  };
  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
