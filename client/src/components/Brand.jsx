import { Link } from 'react-router-dom';
export default function Brand({ light = false, compact = false }) {
  return <Link to="/" className="inline-flex items-center gap-3" aria-label="Nexo Servicio Integral, inicio">
    <span className={`grid ${compact ? 'h-9 w-9' : 'h-11 w-11'} place-items-center rounded-lg bg-cyan font-display text-xl font-black text-navy`}>N</span>
    <span className={`font-display text-[15px] font-extrabold leading-[1.05] tracking-tight ${light ? 'text-white' : 'text-navy'}`}>NEXO<br/><span className={light ? 'text-cyan' : 'text-brand-600'}>SERVICIO INTEGRAL</span></span>
  </Link>;
}
