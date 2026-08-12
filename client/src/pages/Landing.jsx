import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  Gauge,
  Image as ImageIcon,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Snowflake,
  ThermometerSun,
  UserRoundCheck,
  Wind,
  Wrench,
  X
} from 'lucide-react';
import Brand from '../components/Brand';
import api from '../lib/api';

const copy = {
  en: {
    nav: ['Services', 'Why Seals', 'How it works', 'Property managers', 'Contact'],
    login: 'Client login',
    request: 'Request service',
    heroTag: 'Condominium HVAC specialists · Toronto & GTA',
    heroTitle: 'Reliable HVAC service for every suite.',
    heroText: 'Repair, maintenance and installation for condominiums and residential buildings. Clear answers, professional technicians and documented results.',
    heroPrimary: 'Request HVAC service',
    heroSecondary: 'See our services',
    trust: ['Condominium specialists', 'Clear estimates', 'Documented service'],
    introTag: 'Comfort without complications',
    introTitle: 'When the HVAC stops working, you need a clear solution.',
    introText: 'Seals helps property managers and residents diagnose the problem, understand the options and get the work completed—without confusing technical language.',
    introPoints: ['Simple explanations', 'Options before work begins', 'Photos and final reports'],
    servicesTag: 'HVAC services',
    servicesTitle: 'Everything your building needs to stay comfortable.',
    servicesText: 'Specialized service for in-suite systems, fan coils and residential heating and cooling equipment.',
    serviceItems: [
      ['Repair & diagnostics', 'Fast troubleshooting and practical repair options for heating, cooling and ventilation problems.'],
      ['Fan coil service', 'Cleaning, repair and performance care for condominium fan coil units.'],
      ['Preventive maintenance', 'Planned service that helps reduce unexpected breakdowns and extend equipment life.'],
      ['Installation & replacement', 'Professional equipment selection, installation and commissioning for lasting comfort.']
    ],
    quote: 'Need help with an HVAC problem?',
    quoteText: 'Tell us what is happening in everyday words. We will guide you through the next step.',
    whyTag: 'Why choose Seals',
    whyTitle: 'Professional service you can understand and verify.',
    whyText: 'Every service call is handled with the building, the resident and the equipment in mind. You always know what was found, what was approved and what was completed.',
    whyItems: [
      ['Clear communication', 'We explain the issue in plain language and keep every party informed.'],
      ['Approved work only', 'You see the available options and costs before the technician proceeds.'],
      ['Complete evidence', 'Photos, notes and a final service report document the work.'],
      ['Respectful technicians', 'Organized appointments and professional care inside every suite.']
    ],
    processTag: 'Simple service process',
    processTitle: 'From the first request to the final report.',
    processItems: [
      ['01', 'Request', 'The building reports the suite, problem and priority. Photos are optional.'],
      ['02', 'Review & quote', 'Seals reviews the request and presents the appropriate repair options.'],
      ['03', 'Schedule & service', 'The administrator assigns the appointment and a technician completes the work.'],
      ['04', 'Close & document', 'Evidence, payment status and the final report stay available in the client portal.']
    ],
    portalTag: 'Built for property managers',
    portalTitle: 'One clear view of every suite and service request.',
    portalText: 'Your building account can report problems for multiple apartments, approve quotes, follow appointments and keep a complete HVAC service history.',
    portalList: ['Requests by building and suite', 'Quote approvals', 'Appointments and technician progress', 'Payments, documents and service history'],
    portalDemo: 'Explore the interactive portal',
    portalLogin: 'Access client account',
    finalTag: 'Responsive condominium service',
    finalTitle: 'Your building’s comfort deserves a better process.',
    finalText: 'Start a service request and let Seals coordinate the diagnosis, approval, appointment and final documentation.',
    contactTag: 'Request service',
    contactTitle: 'Tell us what’s happening.',
    contactText: 'No technical explanation needed. Share the building, suite and problem. Our team will take it from there.',
    fields: ['Name', 'Email', 'Phone', 'Service', 'Building / suite', 'Describe the problem'],
    serviceOptions: ['Select a service', 'HVAC repair', 'Fan coil service', 'Preventive maintenance', 'Installation or replacement'],
    send: 'Send service request',
    sending: 'Sending…',
    success: 'Thank you. Our team will contact you shortly.',
    error: 'We could not send the request. Please try again.',
    footer: 'Condominium HVAC repair, maintenance and installation across Toronto and the GTA.',
    copyright: '© 2026 Seals HVAC Services. All rights reserved.',
    sticky: 'Request service'
  },
  fr: {
    nav: ['Services', 'Pourquoi Seals', 'Fonctionnement', 'Gestionnaires', 'Contact'],
    login: 'Portail client',
    request: 'Demander un service',
    heroTag: 'Spécialistes CVCA en copropriété · Toronto et RGT',
    heroTitle: 'Un service CVCA fiable pour chaque unité.',
    heroText: 'Réparation, entretien et installation pour copropriétés et immeubles résidentiels. Des réponses claires, des techniciens professionnels et des résultats documentés.',
    heroPrimary: 'Demander un service CVCA',
    heroSecondary: 'Voir nos services',
    trust: ['Spécialistes en copropriété', 'Estimations claires', 'Service documenté'],
    introTag: 'Le confort sans complications',
    introTitle: 'Quand le système CVCA tombe en panne, il faut une solution claire.',
    introText: 'Seals aide les gestionnaires et les résidents à comprendre le problème, comparer les options et terminer les travaux, sans jargon technique.',
    introPoints: ['Explications simples', 'Options avant les travaux', 'Photos et rapport final'],
    servicesTag: 'Services CVCA',
    servicesTitle: 'Tout ce qu’il faut pour assurer le confort de votre immeuble.',
    servicesText: 'Service spécialisé pour systèmes d’unité, ventilo-convecteurs et équipements résidentiels de chauffage et climatisation.',
    serviceItems: [
      ['Réparation et diagnostic', 'Diagnostic rapide et solutions pratiques pour les problèmes de chauffage, climatisation et ventilation.'],
      ['Ventilo-convecteurs', 'Nettoyage, réparation et entretien de performance des unités en copropriété.'],
      ['Entretien préventif', 'Un service planifié pour réduire les pannes imprévues et prolonger la vie des équipements.'],
      ['Installation et remplacement', 'Sélection, installation et mise en service professionnelles pour un confort durable.']
    ],
    quote: 'Un problème de chauffage ou climatisation?',
    quoteText: 'Décrivez-nous la situation avec vos propres mots. Nous vous guiderons vers la prochaine étape.',
    whyTag: 'Pourquoi choisir Seals',
    whyTitle: 'Un service professionnel que vous pouvez comprendre et vérifier.',
    whyText: 'Chaque intervention tient compte de l’immeuble, du résident et de l’équipement. Vous savez toujours ce qui a été trouvé, autorisé et réalisé.',
    whyItems: [
      ['Communication claire', 'Nous expliquons le problème simplement et informons toutes les parties.'],
      ['Travaux autorisés', 'Vous voyez les options et les coûts avant le début des travaux.'],
      ['Preuves complètes', 'Photos, notes et rapport final documentent chaque intervention.'],
      ['Techniciens respectueux', 'Rendez-vous organisés et travail professionnel dans chaque unité.']
    ],
    processTag: 'Un processus simple',
    processTitle: 'De la demande initiale au rapport final.',
    processItems: [
      ['01', 'Demande', 'L’immeuble indique l’unité, le problème et la priorité. Les photos sont facultatives.'],
      ['02', 'Analyse et devis', 'Seals analyse la demande et présente les options de réparation appropriées.'],
      ['03', 'Rendez-vous et service', 'L’administrateur planifie la visite et un technicien effectue les travaux.'],
      ['04', 'Clôture et rapport', 'Les preuves, le paiement et le rapport restent accessibles dans le portail.']
    ],
    portalTag: 'Conçu pour les gestionnaires',
    portalTitle: 'Une vue claire de chaque unité et demande de service.',
    portalText: 'Le compte de votre immeuble permet de signaler des problèmes dans plusieurs appartements, d’approuver les devis et de conserver un historique CVCA complet.',
    portalList: ['Demandes par immeuble et unité', 'Approbation des devis', 'Rendez-vous et suivi du technicien', 'Paiements, documents et historique'],
    portalDemo: 'Explorer le portail interactif',
    portalLogin: 'Accéder au compte client',
    finalTag: 'Service réactif en copropriété',
    finalTitle: 'Le confort de votre immeuble mérite un meilleur processus.',
    finalText: 'Créez une demande et laissez Seals coordonner le diagnostic, l’autorisation, le rendez-vous et le rapport final.',
    contactTag: 'Demander un service',
    contactTitle: 'Décrivez-nous la situation.',
    contactText: 'Aucun jargon nécessaire. Indiquez l’immeuble, l’unité et le problème. Notre équipe s’occupe du reste.',
    fields: ['Nom', 'Courriel', 'Téléphone', 'Service', 'Immeuble / unité', 'Décrivez le problème'],
    serviceOptions: ['Choisir un service', 'Réparation CVCA', 'Service de ventilo-convecteur', 'Entretien préventif', 'Installation ou remplacement'],
    send: 'Envoyer la demande',
    sending: 'Envoi…',
    success: 'Merci. Notre équipe communiquera avec vous sous peu.',
    error: 'La demande n’a pas pu être envoyée. Veuillez réessayer.',
    footer: 'Réparation, entretien et installation CVCA pour copropriétés à Toronto et dans la RGT.',
    copyright: '© 2026 Seals HVAC Services. Tous droits réservés.',
    sticky: 'Demander un service'
  }
};

const serviceIcons = [Wrench, Wind, Gauge, ThermometerSun];
const whyIcons = [MessageSquareText, ShieldCheck, ImageIcon, UserRoundCheck];
const processIcons = [FileText, ClipboardCheck, CalendarCheck2, CheckCircle2];

export default function Landing() {
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState('en');
  const [sent, setSent] = useState('');
  const [sending, setSending] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const root = document.documentElement;
    const elements = [...document.querySelectorAll('[data-reveal]')];
    root.classList.add('motion-ready');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setSent('');
    const form = event.currentTarget;
    try {
      const response = await api.post('/publico/contacto', Object.fromEntries(new FormData(form)));
      setSent(response.data.message || t.success);
      form.reset();
    } catch {
      setSent(t.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="overflow-hidden bg-white text-[#092842]">
      <header className="site-header-enter absolute inset-x-0 top-0 z-50 border-b border-white/20">
        <div className="container-wide flex h-20 items-center justify-between md:h-24">
          <Brand light compact />
          <nav className="hidden items-center gap-6 text-[11px] font-extrabold uppercase tracking-[.12em] text-white/80 xl:flex">
            {t.nav.map((label, index) => (
              <a key={label} href={['#services', '#why', '#process', '#property', '#contact'][index]} className="transition hover:text-cyan">{label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button type="button" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="rounded-full border border-white/30 px-4 py-3 text-xs font-extrabold text-white">
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <Link to="/login" className="rounded-full border border-white/30 px-5 py-3 text-xs font-extrabold text-white transition hover:bg-white hover:text-navy">{t.login}</Link>
            <a href="#contact" className="rounded-full bg-cyan px-5 py-3 text-xs font-extrabold text-navy transition hover:bg-white">{t.request}</a>
          </div>
          <button type="button" onClick={() => setMenu(!menu)} className="rounded-full border border-white/30 p-2.5 text-white md:hidden" aria-label="Menu">
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menu && (
          <div className="border-t border-white/15 bg-[#041b2e]/98 px-5 py-5 text-white backdrop-blur md:hidden">
            <nav className="flex flex-col gap-1">
              {t.nav.map((label, index) => (
                <a key={label} href={['#services', '#why', '#process', '#property', '#contact'][index]} onClick={() => setMenu(false)} className="border-b border-white/10 py-3 text-sm font-bold">{label}</a>
              ))}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="rounded-lg border border-white/25 py-3 text-xs font-bold">{lang === 'en' ? 'Français' : 'English'}</button>
                <Link to="/login" className="rounded-lg bg-white py-3 text-center text-xs font-bold text-navy">{t.login}</Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-[720px] bg-[#041b2e] text-white md:min-h-[820px]">
          <video className="hero-media absolute inset-0 h-full w-full object-cover" src="https://www.sealshvac.ca/video/V1.mp4" autoPlay muted loop playsInline preload="metadata" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,20,35,.96)_0%,rgba(2,20,35,.76)_48%,rgba(2,20,35,.25)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.25),transparent_45%,rgba(2,20,35,.72))]" />
          <div className="hero-scan absolute inset-0" aria-hidden="true" />
          <div className="hero-orbit absolute right-[8%] top-[20%] hidden h-72 w-72 rounded-full border border-cyan/20 lg:block" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_22px_#45c2df]" />
          </div>
          <div className="container-wide relative flex min-h-[720px] items-end pb-24 pt-36 md:min-h-[820px] md:items-center md:pb-20 md:pt-32">
            <div className="max-w-[800px]">
              <p className="hero-enter hero-enter-1 mb-5 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.22em] text-cyan md:text-xs">
                <Snowflake size={17} /> {t.heroTag}
              </p>
              <h1 className="hero-enter hero-enter-2 font-display text-[clamp(2.8rem,7vw,6.6rem)] font-extrabold leading-[.94] tracking-[-.06em]">{t.heroTitle}</h1>
              <p className="hero-enter hero-enter-3 mt-6 max-w-2xl text-[15px] leading-7 text-white/75 md:text-xl md:leading-9">{t.heroText}</p>
              <div className="hero-enter hero-enter-4 mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="cta-pulse inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-cyan px-7 text-sm font-extrabold text-navy shadow-[0_15px_40px_rgba(69,194,223,.25)] transition hover:-translate-y-0.5 hover:bg-white">
                  {t.heroPrimary} <ArrowRight size={18} />
                </a>
                <a href="#services" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/35 bg-white/5 px-7 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15">
                  {t.heroSecondary} <ChevronRight size={18} />
                </a>
              </div>
              <div className="hero-enter hero-enter-5 mt-10 grid max-w-2xl gap-3 border-t border-white/20 pt-6 sm:grid-cols-3">
                {t.trust.map((item, index) => <span key={item} className="trust-item flex items-center gap-2 text-xs font-bold text-white/75" style={{ '--item-delay': `${1.1 + index * .15}s` }}><Check size={15} className="text-cyan" />{item}</span>)}
              </div>
            </div>
          </div>
          <div className="location-ribbon absolute bottom-0 right-0 hidden bg-cyan px-8 py-5 text-xs font-extrabold uppercase tracking-[.14em] text-navy lg:block">
            Toronto · North York · GTA
          </div>
        </section>

        <section className="bg-[#f3f7fa] py-20 md:py-28">
          <div className="container-site grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div data-reveal="left">
              <p className="kicker">{t.introTag}</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] text-navy md:text-6xl">{t.introTitle}</h2>
            </div>
            <div data-reveal="right">
              <p className="text-base leading-8 text-slate-600 md:text-lg">{t.introText}</p>
              <div className="mt-7 space-y-4">
                {t.introPoints.map((item, index) => <div key={item} data-reveal="up" style={{ '--reveal-delay': `${index * 90}ms` }} className="flex items-center gap-3 border-b border-slate-200 pb-4 text-sm font-extrabold"><BadgeCheck className="icon-pop text-brand-600" size={20} />{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl" data-reveal="up">
              <p className="kicker">{t.servicesTag}</p>
              <h2 className="premium-title mt-5">{t.servicesTitle}</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{t.servicesText}</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.serviceItems.map(([title, text], index) => {
                const Icon = serviceIcons[index];
                return (
                  <article key={title} data-reveal="up" style={{ '--reveal-delay': `${index * 110}ms` }} className="service-card group flex min-h-[310px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_45px_rgba(8,43,70,.06)] transition duration-500 hover:-translate-y-2 hover:border-brand-500 hover:bg-navy hover:text-white">
                    <div className="flex items-start justify-between">
                      <span className="grid h-13 w-13 place-items-center rounded-xl bg-brand-50 p-3 text-brand-600 group-hover:bg-white/10 group-hover:text-cyan"><Icon size={25} /></span>
                      <span className="font-serif text-3xl italic text-slate-300 group-hover:text-cyan">0{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-white/65">{text}</p>
                      <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 group-hover:text-cyan">{t.request}<ArrowRight size={14} /></a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div data-reveal="scale" className="quote-banner mt-8 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl bg-cyan px-6 py-7 text-navy md:flex-row md:items-center md:px-9">
              <div><h3 className="font-display text-xl font-extrabold md:text-2xl">{t.quote}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-navy/70">{t.quoteText}</p></div>
              <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-extrabold text-white">{t.request}<ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="why" className="overflow-hidden bg-[#061d31] py-20 text-white md:py-28">
          <div className="container-wide grid gap-14 xl:grid-cols-[.8fr_1.2fr] xl:items-start">
            <div className="xl:sticky xl:top-10" data-reveal="left">
              <p className="kicker text-cyan">{t.whyTag}</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] md:text-6xl">{t.whyTitle}</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/60">{t.whyText}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2">
              {t.whyItems.map(([title, text], index) => {
                const Icon = whyIcons[index];
                return (
                  <article key={title} data-reveal="up" style={{ '--reveal-delay': `${index * 100}ms` }} className="why-card min-h-[240px] bg-[#0a2740] p-7 md:p-9">
                    <Icon className="text-cyan" size={27} />
                    <h3 className="mt-10 font-display text-xl font-extrabold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#f2f6f9] py-20 md:py-28">
          <div className="container-wide">
            <div className="text-center" data-reveal="up">
              <p className="kicker justify-center">{t.processTag}</p>
              <h2 className="premium-title mx-auto mt-5 max-w-4xl">{t.processTitle}</h2>
            </div>
            <div className="relative mt-14 grid gap-4 lg:grid-cols-4">
              <div data-reveal="line" className="process-line absolute left-[12%] right-[12%] top-10 hidden h-px origin-left bg-slate-300 lg:block" />
              {t.processItems.map(([number, title, text], index) => {
                const Icon = processIcons[index];
                return (
                  <article key={title} data-reveal="up" style={{ '--reveal-delay': `${index * 130}ms` }} className="process-card relative rounded-2xl border border-slate-200 bg-white p-7">
                    <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-navy text-cyan shadow-[0_0_0_8px_#f2f6f9]"><Icon size={22} /></span>
                    <span className="mt-8 block text-[10px] font-extrabold uppercase tracking-[.2em] text-brand-600">{number}</span>
                    <h3 className="mt-2 font-display text-xl font-extrabold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="property" className="bg-white py-20 md:py-28">
          <div data-reveal="scale" className="container-wide grid overflow-hidden rounded-[28px] bg-navy lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-7 text-white md:p-12 lg:p-14">
              <p className="kicker text-cyan">{t.portalTag}</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] md:text-5xl">{t.portalTitle}</h2>
              <p className="mt-6 text-base leading-8 text-white/60">{t.portalText}</p>
              <div className="mt-7 space-y-3">
                {t.portalList.map((item, index) => <p key={item} data-reveal="left" style={{ '--reveal-delay': `${index * 80}ms` }} className="flex items-center gap-3 text-sm font-bold text-white/80"><CheckCircle2 size={18} className="text-cyan" />{item}</p>)}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3.5 text-sm font-extrabold text-navy">{t.portalDemo}<ArrowRight size={16} /></Link>
                <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white">{t.portalLogin}</Link>
              </div>
            </div>
            <div className="relative min-h-[440px] bg-[#e8f0f5] p-5 md:p-10">
              <div className="portal-preview h-full overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div className="flex items-center gap-3"><Building2 className="text-brand-600" /><div><b className="block text-sm">Residencias ELORA</b><small className="text-slate-400">Building client portal</small></div></div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold text-emerald-700">ACTIVE</span>
                </div>
                <div className="grid gap-3 p-5">
                  {[
                    ['Suite 530 · No cooling', 'Quote ready', 'bg-amber-50 text-amber-700'],
                    ['Suite 214 · Fan coil noise', 'Scheduled', 'bg-blue-50 text-blue-700'],
                    ['Suite 806 · Preventive service', 'Completed', 'bg-emerald-50 text-emerald-700']
                  ].map(([title, status, tone], index) => (
                    <div key={title} className="portal-ticket rounded-xl border border-slate-200 p-4" style={{ '--ticket-delay': `${index * 140}ms` }}>
                      <div className="flex items-start justify-between gap-3"><div><small className="text-slate-400">SHV-10{53 - index}</small><b className="mt-1 block text-sm">{title}</b></div><span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase ${tone}`}>{status}</span></div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="portal-progress h-full origin-left rounded-full bg-brand-600" style={{ width: `${80 - index * 25}%`, '--ticket-delay': `${.8 + index * .18}s` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-cyan py-16 text-navy md:py-20">
          <Snowflake className="snowflake-drift absolute -right-16 -top-24 h-80 w-80 text-white/20" strokeWidth={1} />
          <div data-reveal="up" className="container-site relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em]">{t.finalTag}</p><h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-.04em] md:text-5xl">{t.finalTitle}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-navy/70">{t.finalText}</p></div>
            <a href="#contact" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-navy px-7 py-4 text-sm font-extrabold text-white">{t.request}<ArrowRight size={17} /></a>
          </div>
        </section>

        <section id="contact" className="bg-[#041725] py-20 text-white md:py-28">
          <div className="container-wide grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div data-reveal="left">
              <p className="kicker text-cyan">{t.contactTag}</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] md:text-6xl">{t.contactTitle}</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-white/60">{t.contactText}</p>
              <div className="mt-9 space-y-4 text-sm font-bold text-white/75">
                <p className="flex items-center gap-3"><Clock3 size={19} className="text-cyan" /> Toronto & Greater Toronto Area</p>
                <p className="flex items-center gap-3"><ShieldCheck size={19} className="text-cyan" /> Authorized client portal available</p>
              </div>
            </div>
            <form data-reveal="right" onSubmit={submit} className="contact-form-glow grid gap-4 rounded-2xl border border-white/15 bg-white/[.06] p-5 backdrop-blur md:grid-cols-2 md:p-8">
              <label><span className="dark-label">{t.fields[0]}</span><input className="dark-input" name="nombre" required placeholder={t.fields[0]} /></label>
              <label><span className="dark-label">{t.fields[1]}</span><input className="dark-input" type="email" name="email" required placeholder="name@email.com" /></label>
              <label><span className="dark-label">{t.fields[2]}</span><input className="dark-input" name="telefono" placeholder={t.fields[2]} /></label>
              <label><span className="dark-label">{t.fields[3]}</span><select className="dark-input" name="servicio" required defaultValue="">{t.serviceOptions.map((item, index) => <option key={item} value={index ? item : ''} disabled={!index}>{item}</option>)}</select></label>
              <label className="md:col-span-2"><span className="dark-label">{t.fields[4]}</span><input className="dark-input" name="ubicacion" placeholder={t.fields[4]} /></label>
              <label className="md:col-span-2"><span className="dark-label">{t.fields[5]}</span><textarea className="dark-input min-h-32 resize-y" name="mensaje" required minLength={10} placeholder={t.fields[5]} /></label>
              <div className="flex flex-col items-start justify-between gap-4 md:col-span-2 md:flex-row md:items-center">
                <button disabled={sending} className="inline-flex min-h-13 items-center gap-3 rounded-full bg-cyan px-7 py-3.5 text-sm font-extrabold text-navy transition hover:bg-white disabled:opacity-60">{sending ? t.sending : t.send}<ArrowRight size={16} /></button>
                {sent && <p className="max-w-xs text-xs leading-5 text-cyan">{sent}</p>}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#020e18] pb-24 pt-12 text-white md:pb-12">
        <div className="container-wide flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row">
          <div><Brand light /><p className="mt-5 max-w-md text-sm leading-6 text-white/45">{t.footer}</p></div>
          <div className="grid grid-cols-2 gap-12 text-sm text-white/55">
            <div className="space-y-3"><b className="block text-[10px] uppercase tracking-widest text-cyan">Services</b><a href="#services" className="block hover:text-white">HVAC service</a><a href="#property" className="block hover:text-white">Property managers</a></div>
            <div className="space-y-3"><b className="block text-[10px] uppercase tracking-widest text-cyan">Access</b><Link to="/login" className="block hover:text-white">{t.login}</Link><Link to="/demo" className="block hover:text-white">Portal demo</Link></div>
          </div>
        </div>
        <div className="container-wide flex flex-col justify-between gap-2 pt-6 text-[11px] text-white/35 sm:flex-row"><p>{t.copyright}</p><p>Toronto, Ontario · Canada</p></div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto] gap-2 border-t border-slate-200 bg-white p-3 shadow-[0_-10px_30px_rgba(4,23,37,.12)] md:hidden">
        <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-extrabold text-white">{t.sticky}<ArrowRight size={16} /></a>
        <Link to="/login" className="grid min-h-12 min-w-12 place-items-center rounded-full border border-slate-200 text-navy" aria-label={t.login}><Building2 size={19} /></Link>
      </div>
    </div>
  );
}
