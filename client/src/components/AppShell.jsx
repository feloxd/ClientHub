import { Bell, CheckCheck, FileText, LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Brand from './Brand';
import { useAuth } from '../state/AuthContext';
import api from '../lib/api';

export default function AppShell({ items, children, admin = false, unread = 0 }) {
  const [open, setOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) api.get('/cliente/notificaciones').then(({ data }) => setNotifications(data)).catch(() => setNotifications([]));
  }, [admin, unread]);
  const pending = notifications.filter((notice) => !notice.leida).length;
  const readAll = async () => {
    await api.patch('/cliente/notificaciones/leidas');
    setNotifications((current) => current.map((notice) => ({ ...notice, leida: true })));
  };
  const openNotice = async (notice) => {
    if (!notice.leida) {
      await api.patch(`/cliente/notificaciones/${notice.id}/leida`);
      setNotifications((current) => current.map((item) => item.id === notice.id ? { ...item, leida: true } : item));
    }
    setNoticeOpen(false);
    if (notice.tipo === 'reporte') navigate(`/portal/reportes/${notice.referencia_id}`);
    if (notice.tipo === 'documento') navigate('/portal/documentos');
  };
  const exit = async () => { await logout(); navigate(admin ? '/admin/login' : '/login'); };
  const nav = <>{items.map(({ to, icon: Icon, label }) => <NavLink key={to} to={to} end={to === (admin ? '/admin' : '/portal')} onClick={() => setOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-semibold transition ${isActive ? 'bg-brand-600 text-white' : 'text-slate-500 hover:bg-brand-50 hover:text-brand-700'}`}><Icon size={19}/>{label}</NavLink>)}</>;
  return <div className="min-h-screen bg-cloud">
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-line bg-white p-5 lg:flex lg:flex-col">
      <Brand compact/><div className="mt-10 space-y-1">{nav}</div><div className="mt-auto border-t border-line pt-5"><p className="truncate text-sm font-bold text-navy">{user?.nombre}</p><p className="truncate text-xs text-slate-500">{user?.email}</p><button onClick={exit} className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-600"><LogOut size={15}/> Cerrar sesión</button></div>
    </aside>
    {open && <div className="fixed inset-0 z-50 bg-navy/40 lg:hidden" onClick={() => setOpen(false)}><aside className="h-full w-72 bg-white p-5" onClick={e=>e.stopPropagation()}><div className="flex items-center justify-between"><Brand compact/><button onClick={()=>setOpen(false)}><X/></button></div><div className="mt-9 space-y-1">{nav}</div></aside></div>}
    <div className="lg:pl-64">
      <header className="no-print sticky top-0 z-40 flex h-17 items-center justify-between border-b border-line bg-white/95 px-5 py-4 backdrop-blur md:px-8">
        <button onClick={()=>setOpen(true)} className="lg:hidden"><Menu/></button><div className="hidden lg:block"><p className="text-xs text-slate-500">{admin ? 'Panel interno' : 'Portal de clientes'}</p></div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <button onClick={() => !admin && setNoticeOpen(!noticeOpen)} className="relative rounded-lg border border-line p-2 text-slate-500" aria-label="Notificaciones"><Bell size={19}/>{pending > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cyan px-1 text-[10px] font-black text-navy">{pending}</span>}</button>
            {noticeOpen && !admin && <div className="absolute right-0 mt-3 w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-xl border border-line bg-white shadow-soft">
              <div className="flex items-center justify-between border-b border-line px-4 py-3"><div><b className="text-sm text-navy">Notificaciones</b><p className="text-[11px] text-slate-500">{pending} sin leer</p></div>{pending > 0 && <button onClick={readAll} className="flex items-center gap-1 text-[11px] font-bold text-brand-600"><CheckCheck size={14}/> Marcar todas</button>}</div>
              <div className="max-h-80 overflow-y-auto">{notifications.length ? notifications.map((notice) => <button key={notice.id} onClick={() => openNotice(notice)} className={`flex w-full gap-3 border-b border-line px-4 py-3 text-left last:border-0 hover:bg-cloud ${notice.leida ? '' : 'bg-brand-50/60'}`}><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600"><FileText size={16}/></span><span><b className="block text-xs text-navy">{notice.tipo === 'reporte' ? 'Nuevo reporte de servicio' : notice.tipo === 'documento' ? 'Nuevo documento disponible' : 'Actualización del sistema'}</b><small className="mt-1 block text-[11px] text-slate-500">{new Date(notice.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</small></span>{!notice.leida && <span className="ml-auto mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan"/>}</button>) : <p className="p-8 text-center text-xs text-slate-500">No tienes notificaciones.</p>}</div>
            </div>}
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-white">{user?.nombre?.split(' ').map(x=>x[0]).slice(0,2).join('')}</div>
        </div>
      </header>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  </div>;
}
