import { Bell, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Brand from './Brand';
import { useAuth } from '../state/AuthContext';

export default function AppShell({ items, children, admin = false, unread = 0 }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
        <div className="ml-auto flex items-center gap-4"><button className="relative rounded-lg border border-line p-2 text-slate-500"><Bell size={19}/>{unread > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cyan px-1 text-[10px] font-black text-navy">{unread}</span>}</button><div className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-white">{user?.nombre?.split(' ').map(x=>x[0]).slice(0,2).join('')}</div></div>
      </header>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  </div>;
}
