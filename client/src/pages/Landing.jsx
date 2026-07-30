import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Gauge,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Star,
  ThermometerSun,
  UserRoundCheck,
  Wind,
  Wrench,
  X
} from 'lucide-react';
import Brand from '../components/Brand';
import api from '../lib/api';

const services = [
  {
    icon: Wrench,
    number: '01',
    title: 'Repairs & diagnostics',
    text: 'Straight answers, clear options and responsive repairs for in-suite HVAC systems.'
  },
  {
    icon: Wind,
    number: '02',
    title: 'Fan coil service',
    text: 'Cleaning, restoration and performance care for fan coil units in modern condominiums.'
  },
  {
    icon: Gauge,
    number: '03',
    title: 'Preventive maintenance',
    text: 'Planned service programs that reduce breakdowns and protect building operations.'
  },
  {
    icon: ThermometerSun,
    number: '04',
    title: 'Installation & replacement',
    text: 'Thoughtful equipment selection and professional installation with complete documentation.'
  }
];

const reviews = [
  {
    quote: 'Seals gives our management team something rare: fast communication, clean work and a clear record of every visit.',
    name: 'Property Manager',
    company: 'Toronto Condominium'
  },
  {
    quote: 'The technician explained the issue in plain language and gave us options before any work began.',
    name: 'Suite Owner',
    company: 'North York'
  },
  {
    quote: 'From the service request to the final report, the entire experience felt organized and professional.',
    name: 'Building Administrator',
    company: 'Greater Toronto Area'
  }
];

const workflow = [
  { icon: MessageSquareText, label: 'Service request', detail: 'Unit 530 · No cooling', state: 'Received' },
  { icon: FileCheck2, label: 'Estimate', detail: 'Repair option approved', state: 'Approved' },
  { icon: UserRoundCheck, label: 'Technician', detail: 'Assigned and en route', state: 'Scheduled' },
  { icon: CheckCircle2, label: 'Service report', detail: 'Photos and notes included', state: 'Complete' }
];

export default function Landing() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setSent('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await api.post('/publico/contacto', data);
      setSent(response.data.message || 'Thank you. Our team will contact you shortly.');
      event.currentTarget.reset();
    } catch (error) {
      setSent(error.response?.data?.error || 'Please call us and we will be happy to help.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="overflow-hidden bg-[#f3f5f7] text-[#10263a]">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/15">
        <div className="container-wide flex h-[92px] items-center justify-between">
          <Brand light />
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[.18em] text-white/80 lg:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#experience" className="transition hover:text-white">Client experience</a>
            <a href="#reviews" className="transition hover:text-white">Reviews</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login" className="rounded-full border border-white/30 px-5 py-3 text-xs font-bold text-white transition hover:bg-white hover:text-navy">
              Client login
            </Link>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-navy transition hover:bg-cyan">
              Request service <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            type="button"
            onClick={() => setMenu(!menu)}
            className="rounded-full border border-white/25 p-2.5 text-white lg:hidden"
            aria-label="Open menu"
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menu && (
          <nav className="border-t border-white/15 bg-[#061729]/95 px-6 py-6 text-sm font-bold text-white backdrop-blur lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-5">
              {[
                ['about', 'About'],
                ['services', 'Services'],
                ['experience', 'Client experience'],
                ['reviews', 'Reviews'],
                ['contact', 'Contact']
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>
              ))}
              <Link to="/login" className="mt-2 rounded-full bg-cyan px-5 py-3 text-center text-navy">Client login</Link>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="relative min-h-[760px] bg-[#061729] text-white lg:min-h-screen">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="https://www.sealshvac.ca/video/V1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,15,28,.94)_0%,rgba(3,15,28,.72)_42%,rgba(3,15,28,.18)_75%,rgba(3,15,28,.45)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.25),transparent_28%,rgba(2,13,25,.65))]" />
          <div className="hero-noise absolute inset-0 opacity-30" />

          <div className="container-wide relative flex min-h-[760px] items-end pb-16 pt-40 lg:min-h-screen lg:pb-20">
            <div className="grid w-full items-end gap-12 lg:grid-cols-[1fr_320px]">
              <div className="max-w-4xl">
                <p className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.28em] text-cyan">
                  <span className="h-px w-10 bg-cyan" />
                  Condominium HVAC specialists · Toronto
                </p>
                <h1 className="font-display text-[clamp(3.7rem,8vw,8.5rem)] font-extrabold leading-[.83] tracking-[-.065em]">
                  Comfort,
                  <br />
                  <span className="font-serif font-normal italic tracking-[-.04em] text-cyan">handled.</span>
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  Responsive HVAC repair, maintenance and installation for condominiums,
                  property managers and modern homes across the GTA.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="#contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan px-7 py-4 text-sm font-extrabold text-[#061729] transition hover:bg-white">
                    Request service
                    <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                  </a>
                  <a href="#services" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10">
                    Explore services <ChevronRight size={17} />
                  </a>
                </div>
              </div>

              <aside className="hidden border-l border-white/20 pl-8 lg:block">
                <p className="text-[10px] font-bold uppercase tracking-[.24em] text-white/45">The Seals standard</p>
                <div className="mt-6 space-y-6">
                  {[
                    ['01', 'Clear communication'],
                    ['02', 'Documented service'],
                    ['03', 'Professional care']
                  ].map(([number, label]) => (
                    <div key={number} className="flex items-center gap-4">
                      <span className="font-serif text-2xl italic text-cyan">{number}</span>
                      <span className="text-sm font-semibold text-white/85">{label}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 hidden items-center gap-8 border-l border-t border-white/15 bg-[#061729]/80 px-9 py-5 text-xs text-white/65 backdrop-blur md:flex">
            <span className="flex items-center gap-2"><Clock3 size={15} className="text-cyan" /> Responsive scheduling</span>
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-cyan" /> Trusted in-suite service</span>
          </div>
        </section>

        <section id="about" className="bg-[#f3f5f7] py-24 sm:py-32">
          <div className="container-wide grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
            <div>
              <p className="kicker">Built around your property</p>
              <div className="mt-20 hidden max-w-xs border-l border-[#b8c5ce] pl-6 lg:block">
                <p className="font-serif text-5xl italic text-brand-600">“</p>
                <p className="-mt-3 text-sm leading-6 text-slate-600">
                  We explain the issue in everyday language, so you can make the right decision with confidence.
                </p>
              </div>
            </div>
            <div>
              <h2 className="premium-title max-w-5xl">
                HVAC service should feel
                <span className="font-serif font-normal italic text-brand-600"> simple, clear and accountable.</span>
              </h2>
              <div className="mt-10 grid gap-8 border-t border-slate-300 pt-8 sm:grid-cols-2">
                <p className="text-base leading-7 text-slate-600">
                  We specialize in the systems that keep condominium suites comfortable.
                  From an urgent repair to a planned building program, every visit is handled
                  with respect for residents and property operations.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong className="font-display text-4xl font-extrabold text-navy">GTA</strong>
                    <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Local coverage</span>
                  </div>
                  <div>
                    <strong className="font-display text-4xl font-extrabold text-navy">100%</strong>
                    <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-slate-500">Documented work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-24 sm:py-32">
          <div className="container-wide">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="kicker">What we do</p>
                <h2 className="premium-title mt-5">Service for every season.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-600">
                Specialized care for in-suite heating and cooling systems, designed around
                the expectations of residents and property teams.
              </p>
            </div>

            <div className="mt-16 grid border-y border-slate-200 lg:grid-cols-4">
              {services.map(({ icon: Icon, number, title, text }, index) => (
                <article
                  key={title}
                  className={`group relative min-h-[390px] px-6 py-8 transition duration-500 hover:bg-[#071a2e] hover:text-white sm:px-8 ${
                    index ? 'border-t border-slate-200 lg:border-l lg:border-t-0' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl italic text-brand-600 group-hover:text-cyan">{number}</span>
                    <Icon size={24} className="text-slate-400 transition group-hover:text-cyan" />
                  </div>
                  <div className="absolute bottom-8 left-6 right-6 sm:left-8 sm:right-8">
                    <h3 className="max-w-[220px] font-display text-2xl font-extrabold leading-tight tracking-tight">{title}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-500 transition group-hover:text-white/60">{text}</p>
                    <a href="#contact" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand-600 group-hover:text-cyan">
                      Learn more <ArrowUpRight size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="relative overflow-hidden bg-[#061729] py-24 text-white sm:py-32">
          <div className="absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-brand-600/20 blur-[120px]" />
          <div className="container-wide relative grid gap-16 xl:grid-cols-[.82fr_1.18fr] xl:items-center">
            <div>
              <p className="kicker text-cyan">A better client experience</p>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] sm:text-6xl">
                From “something’s wrong” to
                <span className="font-serif font-normal italic text-cyan"> problem solved.</span>
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/60">
                Clients can request service, share photos, approve an estimate and follow
                the work from one secure place. No technical language required.
              </p>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-white/70">
                {['Simple requests', 'Clear estimates', 'Photo evidence', 'Complete history'].map((item) => (
                  <span key={item} className="flex items-center gap-2"><Check size={15} className="text-cyan" />{item}</span>
                ))}
              </div>
              <Link to="/login" className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-bold transition hover:bg-white hover:text-navy">
                Preview client portal <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-white/[.07] p-3 shadow-[0_40px_100px_rgba(0,0,0,.35)] backdrop-blur">
              <div className="overflow-hidden rounded-[20px] bg-[#f5f7f9] text-navy">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <img src="https://www.sealshvac.ca/img/logo.png" alt="" className="h-9 w-9 object-contain" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Client portal</p>
                      <p className="text-sm font-extrabold">Service request #0530</p>
                    </div>
                  </div>
                  <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 sm:block">In progress</span>
                </div>
                <div className="grid gap-3 p-4 sm:p-6">
                  {workflow.map(({ icon: Icon, label, detail, state }, index) => (
                    <div key={label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${index < 3 ? 'bg-brand-50 text-brand-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        <Icon size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <b className="block text-sm">{label}</b>
                        <small className="mt-1 block truncate text-slate-500">{detail}</small>
                      </span>
                      <span className="hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:block">{state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#dcecf2] py-24 sm:py-32">
          <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px]">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=88"
                alt="HVAC technician servicing equipment"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061729]/80 via-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.22em] text-cyan">On-site professionalism</p>
                  <p className="mt-2 max-w-sm font-display text-2xl font-extrabold">Care for the equipment. Respect for the home.</p>
                </div>
                <BadgeCheck size={34} className="hidden text-cyan sm:block" />
              </div>
            </div>
            <div className="lg:pl-12">
              <p className="kicker">For property teams</p>
              <h2 className="premium-title mt-5">Built for the way condominiums operate.</h2>
              <p className="mt-7 text-base leading-8 text-slate-600">
                Every visit affects a resident, a suite and a building team. Seals keeps
                everyone aligned with simple communication and dependable documentation.
              </p>
              <div className="mt-9 space-y-5">
                {[
                  [Building2, 'Building and suite service history'],
                  [MapPin, 'Clear locations and technician assignments'],
                  [FileCheck2, 'Before-and-after photos and final reports'],
                  [ShieldCheck, 'Secure access for authorized clients']
                ].map(([Icon, text]) => (
                  <div key={text} className="flex items-center gap-4 border-b border-[#b7ccd5] pb-5">
                    <Icon size={20} className="text-brand-600" />
                    <span className="text-sm font-bold">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-white py-24 sm:py-32">
          <div className="container-wide">
            <div className="text-center">
              <p className="kicker justify-center">Trusted where comfort matters</p>
              <h2 className="premium-title mx-auto mt-5 max-w-4xl">Service people remember for the right reasons.</h2>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {reviews.map(({ quote, name, company }) => (
                <blockquote key={company} className="rounded-2xl border border-slate-200 bg-[#f7f9fa] p-7 sm:p-9">
                  <div className="flex gap-1 text-[#d4a64b]">
                    {[1, 2, 3, 4, 5].map((item) => <Star key={item} size={15} fill="currentColor" />)}
                  </div>
                  <p className="mt-8 font-serif text-2xl leading-9 text-navy">“{quote}”</p>
                  <footer className="mt-9 border-t border-slate-200 pt-5">
                    <b className="block text-sm">{name}</b>
                    <span className="mt-1 block text-xs text-slate-500">{company}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#061729] py-24 text-white sm:py-32">
          <div className="container-wide grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="kicker text-cyan">Request service</p>
              <h2 className="mt-6 font-display text-5xl font-extrabold leading-[.95] tracking-[-.05em] sm:text-6xl">
                Tell us what’s
                <span className="font-serif font-normal italic text-cyan"> happening.</span>
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-white/60">
                No technical explanation needed. Describe the problem in your own words and
                our team will take it from there.
              </p>
              <div className="mt-10 space-y-4 text-sm text-white/80">
                <p className="flex items-center gap-3"><Phone size={18} className="text-cyan" /> Call Seals HVAC</p>
                <p className="flex items-center gap-3"><Clock3 size={18} className="text-cyan" /> Serving Toronto and the GTA</p>
              </div>
            </div>

            <form onSubmit={submit} className="grid gap-5 rounded-[28px] border border-white/15 bg-white/[.07] p-6 backdrop-blur sm:grid-cols-2 sm:p-9">
              <label>
                <span className="dark-label">Name</span>
                <input className="dark-input" name="nombre" required placeholder="Your full name" />
              </label>
              <label>
                <span className="dark-label">Email</span>
                <input className="dark-input" type="email" name="email" required placeholder="name@email.com" />
              </label>
              <label>
                <span className="dark-label">Phone</span>
                <input className="dark-input" name="telefono" placeholder="Your phone number" />
              </label>
              <label>
                <span className="dark-label">Service</span>
                <select className="dark-input" name="servicio" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option>HVAC repair</option>
                  <option>Fan coil service</option>
                  <option>Preventive maintenance</option>
                  <option>Installation or replacement</option>
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="dark-label">What’s happening?</span>
                <textarea className="dark-input min-h-32 resize-y" name="mensaje" required minLength={10} placeholder="Tell us what you are experiencing..." />
              </label>
              <div className="flex flex-col items-start justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                <button disabled={sending} className="inline-flex items-center gap-3 rounded-full bg-cyan px-7 py-4 text-sm font-extrabold text-navy transition hover:bg-white disabled:opacity-60">
                  {sending ? 'Sending…' : 'Send request'} <ArrowRight size={16} />
                </button>
                {sent && <p className="max-w-xs text-xs leading-5 text-cyan">{sent}</p>}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#03101e] py-12 text-white">
        <div className="container-wide">
          <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Brand light />
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">
                Condominium HVAC repair, maintenance and installation across Toronto and the GTA.
              </p>
            </div>
            <div>
              <p className="footer-title">Explore</p>
              <div className="mt-4 space-y-2 text-sm text-white/55">
                <a href="#about" className="block hover:text-white">About</a>
                <a href="#services" className="block hover:text-white">Services</a>
                <a href="#reviews" className="block hover:text-white">Reviews</a>
              </div>
            </div>
            <div>
              <p className="footer-title">Client access</p>
              <div className="mt-4 space-y-2 text-sm text-white/55">
                <Link to="/login" className="block hover:text-white">Client portal</Link>
                <Link to="/admin/login" className="block hover:text-white">Team sign in</Link>
                <a href="#contact" className="block hover:text-white">Request service</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-7 text-[11px] text-white/35 sm:flex-row">
            <p>© 2026 Seals HVAC Services. All rights reserved.</p>
            <p>Toronto, Ontario · Canada</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
