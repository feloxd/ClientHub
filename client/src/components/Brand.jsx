import { useRef } from 'react';
import { animate, spring, utils } from 'animejs';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LOGO_URL = '/images/seals-mascot.png';

export default function Brand({ light = false, compact = false }) {
  const logoRef = useRef(null);
  const animationRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const spinSeal = (event) => {
    event.preventDefault();
    const logo = logoRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!logo || reduceMotion) {
      if (location.pathname !== '/') navigate('/');
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    animationRef.current?.revert();
    utils.set(logo, { perspective: 700, rotateY: 0, rotateZ: 0, scale: 1 });
    animationRef.current = animate(logo, {
      rotateY: '1turn',
      rotateZ: [0, -4, 0],
      scale: [1, 1.18, 1],
      duration: 850,
      ease: spring({ bounce: .3, duration: 760 }),
      onComplete: () => {
        if (location.pathname !== '/') navigate('/');
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <Link to="/" onClick={spinSeal} className="brand-link group inline-flex items-center gap-3" aria-label="Seals HVAC, home. Click the seal to spin it.">
      <img
        ref={logoRef}
        src={LOGO_URL}
        alt="Seals HVAC mascot"
        className={`brand-seal ${compact ? 'h-12 w-12' : 'h-16 w-16'} object-contain`}
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
