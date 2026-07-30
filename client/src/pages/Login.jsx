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

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    try {
      await login(form.email, form.password, portal);
      navigate(admin ? '/admin' : '/portal');
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'We could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-[#061729] lg:grid-cols-[.9fr_1.1fr]">
      <section className="relative flex flex-col bg-[#f4f7f8] px-6 py-7 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Brand />
          <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-600">
            <ArrowLeft size={15} /> Back
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
          <p className="kicker">{admin ? 'Authorized team access' : 'Seals client portal'}</p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-[-.04em] text-navy sm:text-5xl">
            {admin ? 'Operations, organized.' : 'Welcome back.'}
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
            {admin
              ? 'Manage clients, service requests, estimates, assignments and reports.'
              : 'Request service and follow every step, from estimate to final report.'}
          </p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            <label>
              <span className="label">Email address</span>
              <input
                className="input rounded-xl py-3.5"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={admin ? 'admin@sealshvac.ca' : 'client@sealshvac.ca'}
              />
            </label>
            <label>
              <span className="label">Password</span>
              <span className="relative block">
                <input
                  className="input rounded-xl py-3.5 pr-12"
                  type={show ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400"
                  aria-label="Show password"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            <div className="-mt-2 text-right">
              <Link to="/recuperar-contrasena" className="text-xs font-bold text-brand-600 hover:text-brand-700">
                Forgot your password?
              </Link>
            </div>
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#061729] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-brand-600 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Verifying…' : 'Sign in'} <ArrowRight size={17} />
            </button>
          </form>

          {!admin && (
            <>
              <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                Access is available to authorized Seals clients.
              </p>
              <div className="mt-7 rounded-xl border border-brand-100 bg-brand-50 p-4 text-xs text-brand-900">
                <b>Preview account</b>
                <p className="mt-1">client@sealshvac.ca · SealsClient2026!</p>
              </div>
            </>
          )}
          {admin && (
            <div className="mt-7 rounded-xl border border-brand-100 bg-brand-50 p-4 text-xs text-brand-900">
              <b>Preview account</b>
              <p className="mt-1">admin@sealshvac.ca · SealsAdmin2026!</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://www.sealshvac.ca/video/V1.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,16,30,.3),rgba(3,16,30,.88))]" />
        <div className="hero-noise absolute inset-0 opacity-30" />
        <div className="absolute bottom-14 left-14 right-14 text-white xl:bottom-20 xl:left-20 xl:right-20">
          {admin ? <LockKeyhole size={31} className="mb-6 text-cyan" /> : <ShieldCheck size={31} className="mb-6 text-cyan" />}
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-cyan">
            {admin ? 'Seals operations' : 'Everything in one place'}
          </p>
          <h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] xl:text-6xl">
            {admin ? 'Every request. Every technician. Every detail.' : 'Clear service from first request to final report.'}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/65">
            {['Secure access', 'Simple updates', 'Complete history'].map((item) => (
              <span key={item} className="rounded-full border border-white/20 px-4 py-2 backdrop-blur">{item}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
