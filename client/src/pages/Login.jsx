import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import { useAuth } from '../state/AuthContext';

export default function Login({ portal }) {
  const admin = portal === 'admin';
  const { login } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    const form = Object.fromEntries(new FormData(e.currentTarget));
    try { await login(form.email, form.password, portal); navigate(admin ? '/admin' : '/portal'); }
    catch (err) { setError(err.response?.data?.error || 'No fue posible conectar con el servidor.'); }
    finally { setLoading(false); }
  };
  return <main className="grid min-h-screen bg-cloud lg:grid-cols-[1fr_1.05fr]">
    <section className="flex flex-col px-6 py-7 sm:px-12 lg:px-16">
      <div className="flex items-center justify-between"><Brand/><Link to="/" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-600"><ArrowLeft size={16}/> Volver al sitio</Link></div>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
        <span className="eyebrow">{admin ? 'Acceso interno' : 'Portal de clientes'}</span>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy">{admin ? 'Panel administrativo' : 'Bienvenido de nuevo'}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{admin ? 'Ingresa con tus credenciales de administrador.' : 'Consulta tus reportes, fotografías y documentos de servicio.'}</p>
        <form onSubmit={submit} className="mt-9 space-y-5">
          <label><span className="label">Correo electrónico</span><input className="input" type="email" name="email" required autoComplete="email" placeholder={admin ? 'admin@nexo.mx' : 'cliente@nexo.mx'}/></label>
          <label><span className="label">Contraseña</span><span className="relative block"><input className="input pr-12" type={show ? 'text' : 'password'} name="password" required minLength={8} autoComplete="current-password" placeholder="••••••••••"/><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400" aria-label="Mostrar contraseña">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></span></label>
          <div className="-mt-2 text-right"><Link to="/recuperar-contrasena" className="text-xs font-bold text-brand-600 hover:text-brand-700">¿Olvidaste tu contraseña?</Link></div>
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Verificando…' : 'Iniciar sesión'} <ArrowRight size={17}/></button>
        </form>
        {!admin && <><p className="mt-6 text-center text-xs leading-5 text-slate-500">El acceso es únicamente por invitación. Si tu empresa ya es cliente y no tienes acceso, contacta a tu ejecutivo.</p>
        <div className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-4 text-xs text-brand-900"><b>Cuenta demo</b><p className="mt-1">cliente@nexo.mx · ClienteDemo2026!</p></div></>}
        {admin && <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900"><b>Cuenta demo</b><p className="mt-1">admin@nexo.mx · AdminDemo2026!</p></div>}
      </div>
    </section>
    <section className="relative hidden overflow-hidden bg-navy lg:block">
      <img src={admin ? 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=85' : 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1500&q=85'} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45"/>
      <div className="hero-grid absolute inset-0"/>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent"/>
      <div className="absolute bottom-16 left-16 right-16 text-white">
        {admin ? <><LockKeyhole size={34} className="mb-5 text-cyan"/><h2 className="font-display text-4xl font-extrabold">Control operativo<br/>en un solo lugar.</h2></> : <><ShieldCheck size={34} className="mb-5 text-cyan"/><h2 className="font-display text-4xl font-extrabold">Todo el historial<br/>de tu servicio.</h2></>}
        <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">{admin ? 'Clientes, reportes, evidencia y documentos organizados para mantener la operación bajo control.' : 'Información clara, evidencia fotográfica y documentos disponibles cuando los necesites.'}</p>
      </div>
    </section>
  </main>;
}
