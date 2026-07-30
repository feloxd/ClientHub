import { Link } from 'react-router-dom';

const LOGO_URL = 'https://www.sealshvac.ca/img/logo.png';

export default function Brand({ light = false, compact = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-3" aria-label="Seals HVAC, home">
      <img
        src={LOGO_URL}
        alt=""
        className={`${compact ? 'h-9 w-9' : 'h-12 w-12'} object-contain`}
      />
      <span
        className={`font-display text-[15px] font-extrabold leading-[1.05] tracking-[.08em] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        SEALS
        <br />
        <span className={light ? 'text-cyan' : 'text-brand-600'}>HVAC SERVICES</span>
      </span>
    </Link>
  );
}
