import { useState } from 'react';
import { CheckCircle2, KeyRound } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Brand from '../components/Brand';
import api from '../lib/api';

export default function SetPassword() {
  const [params] = useSearchParams();
  const [state, setState] = useState({ loading: false, message: '', error: '' });
  const submit = async (e) => {
    e.preventDefault(); const values = Object.fromEntries(new FormData(e.currentTarget));
    if (values.password !== values.confirm) return setState({ error: 'Las contraseñas no coinciden.' });
    setState({ loading: true });
    try { const { data } = await api.post('/auth/accept-invitation', { token: params.get('token'), password: values.password }); setState({ message: data.message }); }
    catch (err) { setState({ error: err.response?.data?.error || 'No fue posible activar la cuenta.' }); }
  };
  return <main className="min-h-screen bg-cloud px-5 py-8"><div className="mx-auto max-w-md"><div className="mb-12 text-center"><Brand/></div><div className="card p-8">
    {state.message ? <div className="text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={48}/><h1 className="mt-5 font-display text-2xl font-bold text-navy">Cuenta activada</h1><p className="mt-3 text-sm text-slate-600">{state.message}</p><Link to="/login" className="btn-primary mt-7">Ir al inicio de sesión</Link></div> :
    <><KeyRound className="text-brand-600" size={34}/><h1 className="mt-5 font-display text-2xl font-bold text-navy">Establece tu contraseña</h1><p className="mt-2 text-sm leading-6 text-slate-600">Usa al menos 10 caracteres, una mayúscula, una minúscula y un número.</p><form onSubmit={submit} className="mt-7 space-y-5"><label><span className="label">Nueva contraseña</span><input className="input" type="password" name="password" required minLength={10}/></label><label><span className="label">Confirmar contraseña</span><input className="input" type="password" name="confirm" required minLength={10}/></label>{state.error && <p className="text-sm text-red-600">{state.error}</p>}<button disabled={state.loading || !params.get('token')} className="btn-primary w-full">{state.loading ? 'Activando…' : 'Activar acceso'}</button></form></>}
  </div></div></main>;
}
