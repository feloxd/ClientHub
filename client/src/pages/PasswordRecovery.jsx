import { useState } from 'react';
import { CheckCircle2, KeyRound, Mail } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Brand from '../components/Brand';
import api from '../lib/api';

export default function PasswordRecovery({ reset = false }) {
  const [params] = useSearchParams();
  const [state, setState] = useState({ loading: false, message: '', error: '' });
  const submit = async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (reset && values.password !== values.confirm) return setState({ loading: false, message: '', error: 'Las contraseñas no coinciden.' });
    setState({ loading: true, message: '', error: '' });
    try {
      const { data } = reset
        ? await api.post('/auth/reset-password', { token: params.get('token'), password: values.password })
        : await api.post('/auth/request-password-reset', { email: values.email });
      setState({ loading: false, message: data.message, error: '' });
    } catch (error) {
      setState({ loading: false, message: '', error: error.response?.data?.error || 'No fue posible procesar la solicitud.' });
    }
  };
  return <main className="min-h-screen bg-cloud px-5 py-8"><div className="mx-auto max-w-md">
    <div className="mb-12 text-center"><Brand/></div>
    <div className="card p-8">
      {state.message ? <div className="text-center"><CheckCircle2 className="mx-auto text-emerald-500" size={48}/><h1 className="mt-5 font-display text-2xl font-bold text-navy">Solicitud completada</h1><p className="mt-3 text-sm leading-6 text-slate-600">{state.message}</p><Link to="/login" className="btn-primary mt-7">Volver al inicio de sesión</Link></div> :
      <><span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">{reset ? <KeyRound/> : <Mail/>}</span>
        <h1 className="mt-5 font-display text-2xl font-bold text-navy">{reset ? 'Crea una nueva contraseña' : 'Recupera tu acceso'}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{reset ? 'Usa al menos 10 caracteres, una mayúscula, una minúscula y un número.' : 'Escribe el correo autorizado de tu cuenta y te enviaremos instrucciones.'}</p>
        <form onSubmit={submit} className="mt-7 space-y-5">
          {reset ? <><label><span className="label">Nueva contraseña</span><input className="input" name="password" type="password" required minLength={10}/></label><label><span className="label">Confirmar contraseña</span><input className="input" name="confirm" type="password" required minLength={10}/></label></> :
          <label><span className="label">Correo electrónico</span><input className="input" name="email" type="email" autoComplete="email" required placeholder="nombre@empresa.com"/></label>}
          {state.error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>}
          <button className="btn-primary w-full" disabled={state.loading || (reset && !params.get('token'))}>{state.loading ? 'Procesando…' : reset ? 'Actualizar contraseña' : 'Enviar instrucciones'}</button>
        </form>
        <Link to="/login" className="mt-6 block text-center text-sm font-bold text-brand-600">Volver al inicio de sesión</Link></>}
    </div>
  </div></main>;
}
